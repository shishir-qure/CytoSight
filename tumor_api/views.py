from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Patient, Message
from .serializers import PatientSerializer
from .services import get_patient_data

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
