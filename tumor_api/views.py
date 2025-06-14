from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Patient, Observation, DiagnosticReport, Immunization
from .serializers import PatientSerializer

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
            patient = Patient.objects.get(id=patient_id)
            serializer = PatientSerializer(patient)

            # Get related data
            visits = patient.patient_visits.all()
            # Get observations, reports and immunizations for each visit
            visit_data = []

            for visit in visits:
                visit_observations = Observation.objects.filter(visit=visit, patient=patient)
                visit_reports = DiagnosticReport.objects.filter(visit=visit, patient=patient)
                visit_immunizations = Immunization.objects.filter(visit=visit, patient=patient)

                visit_data.append({
                    'visit': visit,
                    'observations': visit_observations,
                    'reports': visit_reports,
                    'immunizations': visit_immunizations
                })

            # Add related data to serializer context
            serializer = PatientSerializer(patient)

            patient_data = {
                'patient': serializer.data,
                'visits': visit_data
            }



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
