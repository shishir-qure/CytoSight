from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .services import get_patient_data
from .models import Patient, Observation, DiagnosticReport, Immunization, Image
from .serializers import PatientSerializer, MediaSerializer
from django.http import FileResponse, Http404


# Create your views here.

class PatientListView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Patient.objects.all()
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
            patient_data = get_patient_data(patient_id, include_llm_outputs=True)
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
