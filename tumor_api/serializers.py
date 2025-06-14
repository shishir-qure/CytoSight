from rest_framework import serializers
from .models import Patient, Image

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'patient', 'visit', 'file', 'created_at']
        read_only_fields = ['id', 'created_at']