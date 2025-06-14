from django.db import models

class Gender(models.TextChoices):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"
    NA = "n/a"


class DiagnosticReportStatus(models.TextChoices):
    NORMAL = "normal", "Normal"
    ABNORMAL = "abnormal", "Abnormal"