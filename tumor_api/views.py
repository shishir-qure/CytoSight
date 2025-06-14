from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Patient, Observation, DiagnosticReport, Immunization, Image, ImageSeries, Visit, AIReport, Message
from .serializers import PatientSerializer, MediaSerializer, ImageSeriesSerializer, AIReportSerializer
from django.http import FileResponse, Http404, HttpResponse
import zipfile
import io
from tumor_api.llm_tasks import create_ai_report


# Create your views here.

class PatientListView(APIView):
    def post(self, request, *args, **kwargs):
        added_to_tumor_board = request.data.get('added_to_tumor_board')

        filters = {}
        if added_to_tumor_board is not None:
            filters['added_to_tumor_board'] = added_to_tumor_board
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        if start_date and end_date:
            filters['patient_visits__scheduled_at__range'] = [start_date, end_date]

        risk = request.data.get('risk')
        print(risk)
        if risk:
            filters['patient_llm_outputs__task_name'] = 'risk_assessment'
            filters['patient_llm_outputs__llm_output__risk_level'] = risk
            filters['patient_llm_outputs__is_deleted'] = False

        print(filters)
        queryset = Patient.objects.filter(**filters)
        serializer = PatientSerializer(queryset, many=True)

        response_data = {
            "status": "success",
            "message": "Patients retrieved successfully",
            "data": serializer.data,
            "count": queryset.count()
        }

        return Response(response_data, status=status.HTTP_200_OK)

class PatientDetailView(APIView):
    def get(self, request, patient_id, *args, **kwargs):
        try:
            patient_data = get_patient_data(patient_id, include_llm_outputs=True, include_messages=True)
            response_data = {
                "status": "success",
                "message": "Patient details retrieved successfully",
                "data": patient_data
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Patient not found"
            }, status=status.HTTP_404_NOT_FOUND)

class AddToTumorBoardView(APIView):
    def post(self, request, patient_id, *args, **kwargs):
        try:
            patient = Patient.objects.get(id=patient_id)
            patient.added_to_tumor_board = True
            patient.save()
            return Response({"status": "success", "message": "Patient added to tumor board"}, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Patient not found"
            }, status=status.HTTP_404_NOT_FOUND)

class AddMessageView(APIView):
    def post(self, request, patient_id, *args, **kwargs):
        try:
            patient = Patient.objects.get(id=patient_id)

            # Get message from request data
            message_text = request.data.get('message')
            if not message_text:
                return Response({
                    "status": "error",
                    "message": "Message text is required"
                }, status=status.HTTP_400_BAD_REQUEST)

            # Create new message
            message = Message.objects.create(
                patient=patient,
                message=message_text
            )


            response_data = {
                "status": "success",
                "message": "Message added successfully",
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        except Patient.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Patient not found"
            }, status=status.HTTP_404_NOT_FOUND)

class MediaUploadView(generics.CreateAPIView):
    """
    API view to handle file uploads (images or videos).
    Accepts POST requests with `patient`, `visit`, and `file` fields.
    """
    queryset = Image.objects.all()
    serializer_class = MediaSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MediaDownloadView(APIView):
    """
    API view to download a media file.
    Accepts GET requests with the file ID in the URL.
    """
    def get(self, request, pk, format=None):
        try:
            image_instance = Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            raise Http404

        # Using FileResponse to stream the file.
        response = FileResponse(image_instance.file.open('rb'), as_attachment=True)
        return response


class ImageSeriesUploadView(generics.CreateAPIView):
    """
    API view to upload a new image series with multiple DICOM files (as PNGs).
    """
    queryset = ImageSeries.objects.all()
    serializer_class = ImageSeriesSerializer


class ImageSeriesDownloadView(APIView):
    """
    API view to download all images in a series as a single zip file.
    """
    def get(self, request, pk, format=None):
        try:
            image_series = ImageSeries.objects.get(pk=pk)
        except ImageSeries.DoesNotExist:
            raise Http404

        # Create an in-memory zip file
        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, 'w') as zf:
            for dicom_file in image_series.dicom_files.all():
                # Read file content and add to zip
                file_content = dicom_file.file.read()
                file_name = dicom_file.file.name.split('/')[-1]
                zf.writestr(file_name, file_content)

        buffer.seek(0)

        response = HttpResponse(buffer, content_type='application/zip')
        response['Content-Disposition'] = f'attachment; filename="series_{pk}.zip"'
        return response


class PatientAIReportView(APIView):
    """
    API view to get the AIReport for a patient.
    Assumes only one ImageSeries exists per patient.
    Returns 404 if no ImageSeries or AIReport exists.
    """
    def get(self, request, patient_id, format=None):
        try:
            # Get the patient
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            raise Http404("Patient not found")
        
        try:
            # Get the ImageSeries for this patient (assuming only one exists)
            image_series = patient.patient_image_series.get()
        except ImageSeries.DoesNotExist:
            raise Http404("No ImageSeries found for this patient")
        except ImageSeries.MultipleObjectsReturned:
            # If multiple exist, get the most recent one
            image_series = patient.patient_image_series.order_by('-created_at').first()
        
        try:
            # Get the AIReport for this ImageSeries
            ai_report = image_series.ai_report
        except AIReport.DoesNotExist:
            raise Http404("No AIReport found for this patient's ImageSeries")
        
        # Serialize and return the AIReport
        serializer = AIReportSerializer(ai_report)
        return Response({
            "status": "success",
            "message": "AIReport retrieved successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)
