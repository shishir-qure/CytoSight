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
                    'id': visit.id,
                    'scheduled_at': visit.scheduled_at,
                    'created_at': visit.created_at,
                    'actor_assigned': visit.actor_assigned.name,
                    'observations': [{
                        'id': obs.id,
                        'focus': obs.focus,
                        'created_at': obs.created_at
                    } for obs in visit_observations],
                    'reports': [{
                        'id': report.id,
                        'free_text_report': report.free_text_report,
                        'created_at': report.created_at
                    } for report in visit_reports],
                    'immunizations': [{
                        'id': imm.id,
                        'vaccine': imm.vaccine,
                        'created_at': imm.created_at
                    } for imm in visit_immunizations]
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
