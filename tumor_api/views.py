from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Patient
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
