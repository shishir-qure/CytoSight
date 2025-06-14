from rest_framework import serializers
from .models import Patient, Image, DicomFile, ImageSeries, DiagnosticReport, Visit
from .utils import DiagnosticReportStatus

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'patient', 'visit', 'file', 'created_at']
        read_only_fields = ['id', 'created_at']

class DicomFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DicomFile
        fields = ['id', 'file', 'created_at']

class ImageSeriesSerializer(serializers.ModelSerializer):
    dicom_files = serializers.ListField(
        child=serializers.FileField(),
        write_only=True
    )
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
            'diagnostic_report_text', 'diagnostic_report_status'
        ]
        read_only_fields = ['id', 'created_at']

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