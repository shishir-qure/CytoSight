from django.db import models
from tumor_api.utils import Gender

class Workspace(models.Model):
    name = models.CharField(max_length=100, null=False, db_index=True)

class Actor(models.Model):
    name = models.CharField(max_length=200, null=False, db_index=True)

class Patient(models.Model):
    patient_id = models.CharField(max_length=100, null=False, db_index=True)
    name = models.CharField(max_length=200, null=False, default="-", db_index=True)
    dob = models.DateField(null=False, db_index=True)
    contact = models.CharField(max_length=100, null=True, db_index=True)
    address = models.CharField(max_length=200, null=True, db_index=True)
    gender = models.CharField(max_length=10, null=True, db_index=True)
    workspace = models.ForeignKey(Workspace, related_name="workspace", on_delete=models.CASCADE)
    added_to_tumor_board = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['workspace', 'patient_id']),
            models.Index(fields=['workspace', 'name']),
            models.Index(fields=['workspace', 'dob']),
            models.Index(fields=['workspace', 'gender']),
        ]

class Message(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_messages", on_delete=models.CASCADE)
    message = models.TextField(null=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'created_at']),
        ]

class Visit(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_visits", on_delete=models.CASCADE)
    scheduled_at = models.DateTimeField(blank=True, null=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)
    actor_assigned = models.ForeignKey(Actor, related_name="actor_visits", on_delete=models.CASCADE)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'scheduled_at']),
            models.Index(fields=['patient', 'created_at']),
            models.Index(fields=['actor_assigned', 'scheduled_at']),
        ]

class Observation(models.Model):
    focus = models.CharField(max_length=200, null=False, db_index=True)
    patient = models.ForeignKey(Patient, related_name="patient_observations", on_delete=models.CASCADE)
    visit = models.ForeignKey(Visit, related_name="visit_observations", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'focus']),
            models.Index(fields=['patient', 'created_at']),
            models.Index(fields=['visit', 'focus']),
        ]

class DiagnosticReport(models.Model):
    free_text_report = models.CharField(max_length=400, null=False)
    patient = models.ForeignKey(Patient, related_name="patient_reports", on_delete=models.CASCADE)
    visit = models.ForeignKey(Visit, related_name="visit_reports", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'created_at']),
            models.Index(fields=['visit', 'created_at']),
        ]

class MedicationStatement(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_medication_statements", on_delete=models.CASCADE)
    medication_text = models.CharField(max_length=200, null=False, db_index=True)
    dosage = models.CharField(max_length=200, null=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'medication_text']),
            models.Index(fields=['patient', 'created_at']),
        ]

class Immunization(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_immunizations", on_delete=models.CASCADE)
    visit = models.ForeignKey(Visit, related_name="visit_immunizations", on_delete=models.CASCADE)
    vaccine = models.CharField(max_length=200, null=False, db_index=True) # make this into an enum maybe
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'vaccine']),
            models.Index(fields=['patient', 'created_at']),
            models.Index(fields=['visit', 'vaccine']),
        ]

class CarePlan(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_care_plans", on_delete=models.CASCADE)
    care_plan_provided = models.CharField(max_length=300, null=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'created_at']),
        ]

class Image(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_images", on_delete=models.CASCADE)
    image_id = models.CharField(max_length=200, null=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'image_id']),
            models.Index(fields=['patient', 'created_at']),
        ]

class LLMOutputs(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_llm_outputs", on_delete=models.CASCADE)
    task_name = models.CharField(max_length=200, null=False, db_index=True)
    llm_output = models.JSONField(null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'created_at']),
        ]