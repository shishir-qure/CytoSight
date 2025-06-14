from tumor_api.models import Patient, Observation, DiagnosticReport, Immunization, MedicationStatement, CarePlan
from tumor_api.serializers import PatientSerializer

def get_patient_data(patient_id, include_llm_outputs=False):
    patient = Patient.objects.get(id=patient_id)
    serializer = PatientSerializer(patient)

    visits = patient.patient_visits.all()
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
            } for obs in visit_observations],
            'reports': [{
                'id': report.id,
                'free_text_report': report.free_text_report,
            } for report in visit_reports],
            'immunizations': [{
                'id': imm.id,
                'vaccine': imm.vaccine,
            } for imm in visit_immunizations]
        })

    medications = MedicationStatement.objects.filter(patient=patient)
    care_plans = CarePlan.objects.filter(patient=patient)

    patient_data = {
        'patient': serializer.data,
        'medications': [{
            'id': medication.id,
            'medication_text': medication.medication_text,
            'dosage': medication.dosage,
        } for medication in medications],
        'care_plans': [{
            'id': care_plan.id,
            'care_plan_provided': care_plan.care_plan_provided,
        } for care_plan in care_plans],
        'visits': visit_data
    }
    return patient_data