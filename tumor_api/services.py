from tumor_api.models import Patient, Observation, DiagnosticReport, Immunization, MedicationStatement, CarePlan, LLMOutputs, Message
from tumor_api.serializers import PatientSerializer

def get_patient_data(patient_id, include_llm_outputs=False, include_messages=False):
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

    try:
        diagnostic_tests = LLMOutputs.objects.get(patient=patient, task_name="diagnostic_tests", is_deleted=False)
        patient_data['diagnostic_tests'] = diagnostic_tests.llm_output
    except LLMOutputs.DoesNotExist:
        pass

    try:
        visit_encounters = LLMOutputs.objects.get(patient=patient, task_name="visit_encounters", is_deleted=False)
        patient_data['visit_encounters'] = visit_encounters.llm_output
    except LLMOutputs.DoesNotExist:
        pass

    try:
        structured_clinical_notes = LLMOutputs.objects.get(patient=patient, task_name="structured_clinical_notes", is_deleted=False)
        patient_data['clinical_notes'] = structured_clinical_notes.llm_output
    except LLMOutputs.DoesNotExist:
        pass

    if include_llm_outputs:
        try:
            risk_assessment = LLMOutputs.objects.get(patient=patient, task_name="risk_assessment", is_deleted=False)
            patient_data['risk_assessment'] = risk_assessment.llm_output
        except LLMOutputs.DoesNotExist:
            pass

        try:
            patient_summary = LLMOutputs.objects.get(patient=patient, task_name="patient_summary", is_deleted=False)
            patient_data['patient_summary'] = patient_summary.llm_output
        except LLMOutputs.DoesNotExist:
            pass

    if include_messages:
        try:
            messages = Message.objects.filter(patient=patient).order_by('-created_at')
            patient_data['messages'] = [{
                'id': message.id,
                'message': message.message,
                'created_at': message.created_at,
            } for message in messages]
        except Message.DoesNotExist:
            pass

    return patient_data