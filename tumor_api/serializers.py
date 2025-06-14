from rest_framework import serializers
from .models import Patient, Message

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'