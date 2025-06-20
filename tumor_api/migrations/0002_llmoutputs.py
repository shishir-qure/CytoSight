# Generated by Django 5.2.3 on 2025-06-14 12:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("tumor_api", "0002_actor_display_name_diagnosticreport_status_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="LLMOutputs",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("task_name", models.CharField(db_index=True, max_length=200)),
                ("llm_output", models.JSONField()),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("is_deleted", models.BooleanField(db_index=True, default=False)),
                ("deleted_at", models.DateTimeField(db_index=True, null=True)),
                (
                    "patient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="patient_llm_outputs",
                        to="tumor_api.patient",
                    ),
                ),
            ],
            options={
                "indexes": [
                    models.Index(
                        fields=["patient", "created_at"],
                        name="tumor_api_l_patient_69d54c_idx",
                    )
                ],
            },
        ),
    ]
