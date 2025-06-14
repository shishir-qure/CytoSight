from django.db import models
from tumor_api.utils import Gender, DiagnosticReportStatus

class Workspace(models.Model):
    name = models.CharField(max_length=100, null=False, db_index=True)
    display_name = models.CharField(max_length=200, null=False, db_index=True, default="workspace")

class Actor(models.Model):
    name = models.CharField(max_length=200, null=False, db_index=True)
    display_name = models.CharField(max_length=200, null=False, db_index=True, default="actor_name")

class Patient(models.Model):
    patient_id = models.CharField(max_length=100, null=False, db_index=True)
    name = models.CharField(max_length=200, null=False, default="-", db_index=True)
    dob = models.DateField(null=False, db_index=True)
    contact = models.CharField(max_length=100, null=True, db_index=True)
    address = models.CharField(max_length=200, null=True, db_index=True)
    gender = models.CharField(max_length=10, null=True, db_index=True)
    workspace = models.ForeignKey(Workspace, related_name="workspace", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['workspace', 'patient_id']),
            models.Index(fields=['workspace', 'name']),
            models.Index(fields=['workspace', 'dob']),
            models.Index(fields=['workspace', 'gender']),
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
    status = models.CharField(
        max_length=10,
        choices=DiagnosticReportStatus.choices,
        default=DiagnosticReportStatus.NORMAL,
        db_index=True,
    )
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

class PhysicianNotes(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_physician_notes", on_delete=models.CASCADE)
    notes = models.CharField(max_length=300, null=False, db_index=True)
    visit = models.ForeignKey(Visit, related_name="visit_physician_notes", on_delete=models.CASCADE)
    class Meta:
        indexes = [
            models.Index(fields=['patient'])
        ]

def get_general_media_upload_path(instance, filename):
    return f'patient_{instance.patient.id}/media/{filename}'

def get_dicom_upload_path(instance, filename):
    """
    Generates a unique path for each DICOM file.
    It's important that the ImageSeries instance is saved before saving a DicomFile instance
    that belongs to it, otherwise `instance.series.id` will be None.
    """
    return f'patient_{instance.series.patient.id}/series_{instance.series.id}/{filename}'

class ImageSeries(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_image_series", on_delete=models.CASCADE)
    visit = models.ForeignKey(Visit, related_name="visit_image_series", on_delete=models.CASCADE, null=True, blank=True)
    description = models.CharField(max_length=200, blank=True)
    diagnostic_report = models.ForeignKey(DiagnosticReport, related_name="diagnostic_report_image_series", on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['patient', 'created_at']),
        ]


class LLMOutputs(models.Model):
    patient = models.ForeignKey(Patient, related_name="patient_llm_outputs", on_delete=models.CASCADE)
    task_name = models.CharField(max_length=200, null=False, db_index=True)
    llm_output = models.JSONField(null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, db_index=True)
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, db_index=True)

class Image(models.Model):
    # For general images and videos
    patient = models.ForeignKey(Patient, related_name="images", on_delete=models.CASCADE)
    visit = models.ForeignKey(Visit, related_name="images", on_delete=models.CASCADE, null=True, blank=True)
    file = models.FileField(upload_to=get_general_media_upload_path, null=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)


    class Meta:
        indexes = [
            models.Index(fields=['patient', 'created_at']),
        ]

class DicomFile(models.Model):
    # Represents a single DICOM file, part of a series
    series = models.ForeignKey(ImageSeries, related_name="dicom_files", on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_dicom_upload_path)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['series', 'created_at']),
        ]

class AIReport(models.Model):
    """
    Stores the output of an AI analysis for a given ImageSeries.
    """
    image_series = models.OneToOneField(ImageSeries, related_name="ai_report", on_delete=models.CASCADE)
    scan_type = models.CharField(max_length=50, db_index=True)
    image_count = models.IntegerField()
    summary = models.TextField(blank=True)
    keyslices_dict = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['image_series']),
        ]
