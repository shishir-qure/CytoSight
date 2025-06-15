from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Patient, Observation, DiagnosticReport, Immunization, Image, ImageSeries, Visit, AIReport, Message, LLMOutputs
from .serializers import PatientSerializer, MediaSerializer, ImageSeriesSerializer, AIReportSerializer
from django.http import FileResponse, Http404, HttpResponse
from .services import get_patient_data
import zipfile
import io
from tumor_api.llm_tasks import create_ai_report
from tumor_api.patient_creation import generate_patient_data, populate_normal_patient_details, generate_lung_related_patient_data, populate_lung_related_patient_details, generate_lung_cancer_patient_data, populate_lung_cancer_patient_details
from tumor_api.file_utils import get_file_server_info


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
        if risk:
            filters['patient_llm_outputs__task_name'] = 'risk_assessment'
            filters['patient_llm_outputs__llm_output__risk_level'] = risk
            filters['patient_llm_outputs__is_deleted'] = False

        queryset = Patient.objects.filter(**filters).order_by('-patient_visits__scheduled_at')
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


class NormalPatientCreationView(APIView):
    """
    API view to create normal patients with lung-related diseases using LLM generation.
    """
    def post(self, request, *args, **kwargs):
        try:
            # Generate patient data using LLM
            patient_data = generate_patient_data()
            print(patient_data)

            
            if not patient_data:
                return Response({
                    "status": "error",
                    "message": "Failed to generate patient data from LLM"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            # Populate the database with generated data
            result = populate_normal_patient_details(patient_data)
            
            if result.get('status') == 'error':
                return Response({
                    "status": "error",
                    "message": result.get('message', 'Unknown error occurred')
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({
                "status": "success",
                "message": result.get('message', 'Patients created successfully'),
                "data": {
                    "patients_created": result.get('patients', []),
                    "raw_llm_data": patient_data
                }
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                "status": "error",
                "message": f"An unexpected error occurred: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LungRelatedPatientCreationView(APIView):
    """
    API view to create lung-related patients with specific lung diseases using LLM generation.
    """
    def post(self, request, *args, **kwargs):
        try:
            # Generate lung-related patient data using LLM
            patient_data = generate_lung_related_patient_data()
            print(patient_data)
            
            if not patient_data:
                return Response({
                    "status": "error",
                    "message": "Failed to generate lung-related patient data from LLM"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            # Populate the database with generated data
            result = populate_lung_related_patient_details(patient_data)
            
            if result.get('status') == 'error':
                return Response({
                    "status": "error",
                    "message": result.get('message', 'Unknown error occurred')
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({
                "status": "success",
                "message": result.get('message', 'Lung-related patients created successfully'),
                "data": {
                    "patients_created": result.get('patients', []),
                    "raw_llm_data": patient_data
                }
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                "status": "error",
                "message": f"An unexpected error occurred: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LungCancerPatientCreationView(APIView):
    """
    API view to create comprehensive lung cancer patients across different phases of their cancer journey using LLM generation.
    """
    def post(self, request, *args, **kwargs):
        try:
            # Generate lung cancer patient data using LLM
            patient_data = generate_lung_cancer_patient_data()
            print(patient_data)
            
            if not patient_data:
                return Response({
                    "status": "error",
                    "message": "Failed to generate lung cancer patient data from LLM"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            # Populate the database with generated data
            result = populate_lung_cancer_patient_details(patient_data)
            
            if result.get('status') == 'error':
                return Response({
                    "status": "error",
                    "message": result.get('message', 'Unknown error occurred')
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({
                "status": "success",
                "message": result.get('message', 'Lung cancer patients created successfully'),
                "data": {
                    "patients_created": result.get('patients', []),
                    "raw_llm_data": patient_data
                }
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                "status": "error",
                "message": f"An unexpected error occurred: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FileServerInfoView(APIView):
    """
    API view to get file server configuration and status information.
    """
    def get(self, request, *args, **kwargs):
        try:
            file_server_info = get_file_server_info()
            
            # Check if the file server is accessible
            import requests
            import os
            
            file_server_status = "unknown"
            try:
                response = requests.get(f"{file_server_info['host']}/", timeout=5)
                if response.status_code == 200:
                    file_server_status = "running"
                else:
                    file_server_status = "error"
            except requests.exceptions.RequestException:
                file_server_status = "not_running"
            
            # Check if media directory exists
            media_dir_exists = os.path.exists(file_server_info['media_root'])
            
            return Response({
                "status": "success",
                "message": "File server information retrieved successfully",
                "data": {
                    "file_server": {
                        **file_server_info,
                        "status": file_server_status,
                        "media_directory_exists": media_dir_exists
                    },
                    "instructions": {
                        "start_server": "Run: ./start_file_server.sh",
                        "install_serve": "Run: npm install -g serve",
                        "check_config": "Edit: tumor_project/config.env"
                    }
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                "status": "error",
                "message": f"An unexpected error occurred: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class PhysicianNotesView(APIView):
    def post(self, request, patient_id, *args, **kwargs):
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Patient not found"
            }, status=status.HTTP_404_NOT_FOUND)

        notes = request.data.get('notes')
        if not notes:
            return Response({
                "status": "error",
                "message": "Notes are required"
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create new physician notes

        try:
            structured_clinical_notes = LLMOutputs.objects.get(patient=patient, task_name="structured_clinical_notes", is_deleted=False)
            structured_clinical_notes.llm_output.append(notes)
            structured_clinical_notes.save()
        except LLMOutputs.DoesNotExist:
            LLMOutputs.objects.create(
                patient=patient,
                task_name="structured_clinical_notes",
                llm_output=[notes]
            )

        return Response({
            "status": "success",
            "message": "Notes added successfully"
        }, status=status.HTTP_200_OK)
