from tumor_api.llm_service import LLMService
from tumor_api.models import Patient, LLMOutputs
from tumor_api.services import get_patient_data
from django.utils import timezone

def get_risk_assessment(patient_id):
    patient_data = get_patient_data(patient_id)
    system_prompt = """
        You are a cautious but concise clinical decision-support LLM.
        Do not over-diagnose. Assign **one** lung-cancer-risk tier (Low, Moderate, High)
        for a patient **without a confirmed cancer diagnosis**.
        Use ONLY the evidence given under the four labelled sections.
        If a section is missing, treat it as “no contributory data”.
        Weigh factors broadly in line with Brock / Mayo risk calculators and
        Fleischner 2023 nodule follow-up guidance, but explain your reasoning in plain English.
        Return your answer in the exact JSON schema shown below. No extra keys, no prose outside JSON.
        Valid tiers:
        • Low: estimated probability less than 5% in 2 years
        • Moderate: 5 to 15%
        • High: greater than 15%
        ### OUTPUT-SCHEMA
        {
            "risk_level": "",
            "probability_range": "",
            "drivers": [],
            "lack_of_risk_evidence": [],
            "guideline_reference": ""
        }
    """

    user_prompt = """
        Here is the patient's data:
        {patient_data}
    """

    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    response = llm_service.get_response("gpt-3.5-turbo", messages)

    # Mark any existing risk assessments as deleted
    LLMOutputs.objects.filter(
        patient_id=patient_id,
        task_name="risk_assessment",
        is_deleted=False
    ).update(
        is_deleted=True,
        deleted_at=timezone.now()
    )

    # Create new risk assessment
    LLMOutputs.objects.create(
        patient=Patient.objects.get(id=patient_id),
        task_name="risk_assessment",
        llm_output=response
    )
    return response

def get_patient_summary(patient_id):
    patient_data = get_patient_data(patient_id)
    system_prompt = """
        You are a nurse navigator who can help with patient care.
        You will be given a patient's data and you will need to provide a summary of the patient's data.
        Please provide a concise summary that includes:
        - Key demographic information
        - Current medical conditions
        - Recent visits and their outcomes
        - Active medications
        - Current care plans
        - Any notable observations or diagnostic reports

        Format your response as a clear, well-structured paragraph.
        Focus on the most relevant information for patient care coordination.
        Use plain language that would be understandable to both healthcare providers and patients.
    """

    user_prompt = """
        Here is the patient's data:
        {patient_data}
    """
    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    response = llm_service.get_response("gpt-3.5-turbo", messages)

    # Mark any existing patient summaries as deleted
    LLMOutputs.objects.filter(
        patient_id=patient_id,
        task_name="patient_summary",
        is_deleted=False
    ).update(
        is_deleted=True,
        deleted_at=timezone.now()
    )

    # Create new patient summary
    LLMOutputs.objects.create(
        patient=Patient.objects.get(id=patient_id),
        task_name="patient_summary",
        llm_output=response
    )
    return response