from rest_framework import serializers
from .models import Patient, Image, DicomFile, ImageSeries, DiagnosticReport, Visit, Message, AIReport
from .utils import DiagnosticReportStatus
from .file_utils import get_external_file_url

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    external_file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Image
        fields = ['id', 'patient', 'visit', 'file', 'external_file_url', 'created_at']
        read_only_fields = ['id', 'created_at', 'external_file_url']
    
    def get_external_file_url(self, obj):
        """Get external file server URL for the uploaded file"""
        return get_external_file_url(obj.file)

class DicomFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DicomFile
        fields = ['id', 'file', 'created_at']

class ImageSeriesSerializer(serializers.ModelSerializer):
    dicom_files = serializers.ListField(
        child=serializers.FileField(),
        write_only=True
    )
    dicom_file_urls = serializers.SerializerMethodField()
    diagnostic_report_text = serializers.CharField(
        max_length=400,
        required=False,
        write_only=True,
        help_text="Text for creating a new diagnostic report"
    )
    diagnostic_report_status = serializers.ChoiceField(
        choices=DiagnosticReportStatus.choices,
        default=DiagnosticReportStatus.NORMAL,
        required=False,
        write_only=True,
        help_text="Status for the diagnostic report (normal/abnormal)"
    )

    class Meta:
        model = ImageSeries
        fields = [
            'id', 'patient', 'visit', 'description',
            'diagnostic_report', 'created_at', 'dicom_files',
            'dicom_file_urls', 'diagnostic_report_text', 'diagnostic_report_status'
        ]
        read_only_fields = ['id', 'created_at', 'dicom_file_urls']
    
    def get_dicom_file_urls(self, obj):
        """Get external file server URLs for all DICOM files in the series"""
        if hasattr(obj, 'dicom_files'):
            dicom_files = obj.dicom_files.all()
            urls = []
            for dicom_file in dicom_files:
                url = get_external_file_url(dicom_file.file)
                if url:
                    urls.append({
                        'id': dicom_file.id,
                        'url': url,
                        'filename': dicom_file.file.name.split('/')[-1] if dicom_file.file.name else '',
                        'created_at': dicom_file.created_at
                    })
            return urls
        return []

    def create(self, validated_data):
        dicom_files_data = validated_data.pop('dicom_files')
        diagnostic_report_text = validated_data.pop('diagnostic_report_text', None)
        diagnostic_report_status = validated_data.pop('diagnostic_report_status', DiagnosticReportStatus.NORMAL)

        # Create diagnostic report if text is provided
        if diagnostic_report_text:
            patient = validated_data['patient']
            visit = validated_data.get('visit')

            if not visit:
                raise serializers.ValidationError(
                    "A visit is required when creating a diagnostic report."
                )

            diagnostic_report = DiagnosticReport.objects.create(
                patient=patient,
                visit=visit,
                free_text_report=diagnostic_report_text,
                status=diagnostic_report_status
            )
            validated_data['diagnostic_report'] = diagnostic_report

        # Create the image series
        image_series = ImageSeries.objects.create(**validated_data)

        # Create DICOM files
        for dicom_file_data in dicom_files_data:
            DicomFile.objects.create(series=image_series, file=dicom_file_data)
        
        return image_series

class AIReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIReport
        fields = ['id', 'scan_type', 'image_count', 'summary', 'keyslices_dict', 'created_at']
        read_only_fields = ['id', 'created_at']
