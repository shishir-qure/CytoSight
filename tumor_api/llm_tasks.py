from tumor_api.llm_service import LLMService
from tumor_api.models import Patient, LLMOutputs
from tumor_api.services import get_patient_data
from django.utils import timezone
import json

def get_risk_assessment(patient_id):
    patient_data = get_patient_data(patient_id)
    system_prompt = """
        You are a cautious but concise clinical decision-support LLM.
        Do not over-diagnose. Assign **one** lung-cancer-risk tier (Low, Moderate, High)
        for a patient **without a confirmed cancer diagnosis**.
        Use ONLY the evidence given under the four labelled sections.
        If a section is missing, treat it as "no contributory data".
        Weigh factors broadly in line with Brock / Mayo risk calculators and
        Fleischner 2023 nodule follow-up guidance, but explain your reasoning in plain English.

        IMPORTANT: You must return ONLY a valid JSON object with no additional text before or after.
        The response must be parseable by json.loads().

        Valid tiers:
        • Low: estimated probability less than 5% in 2 years
        • Moderate: 5 to 15%
        • High: greater than 15%

        Return your answer in this exact JSON format with no additional text:
        {
            "risk_level": "Low|Moderate|High",
            "probability_range": "0-5%|5-15%|>15%",
            "drivers": ["list", "of", "key", "risk", "factors"],
            "lack_of_risk_evidence": ["list", "of", "missing", "or", "negative", "factors"],
            "guideline_reference": "Brock/Mayo/Fleischner"
        }
    """

    user_prompt = f"""
        Here is the patient's data:
        {patient_data}
    """

    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    response = llm_service.get_response("gpt-3.5-turbo", messages)
    response = json.loads(response) if response else None

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

    user_prompt = f"""
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

def get_diagnostic_tests(patient_id):
    patient_data = get_patient_data(patient_id)
    system_prompt = """
        Generate all diagnostic tests and results for [PATIENT_NAME].
        Return your answer in the exact JSON schema shown below. No extra keys, no prose outside JSON.
        Extract every diagnostic test, lab result, imaging study, pathology report, and procedure from the patient's encounters and convert them into this structure:
        ### OUTPUT-SCHEMA
        [
            {
                name: "Test Name",
                date: "MMM DD, YYYY HH:MM",
                status: "Complete/Normal/Abnormal/Critical/Pending",
                priority: "Routine/Urgent/Critical/STAT",
                findings: "Primary findings text from original report",
                values: "Specific lab values if applicable (e.g., 'pO2: 85 mmHg, pH: 7.38')",
                aiFindings: [
                "AI interpretation point 1 - clinical significance",
                "AI interpretation point 2 - normal ranges or concerns",
                "AI interpretation point 3 - treatment implications",
                "AI interpretation point 4 - follow-up recommendations"
                ],
                technician: "Role + Random Name (e.g., 'RT Sarah Johnson', 'Lab Tech Maria Rodriguez')",
                radiologist: "Dr. Random Name" // or pathologist for lab tests
            }
        ]
    """

    user_prompt = f"""
        Here is the patient's data:
        {patient_data}
    """

    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    response = llm_service.get_response("gpt-3.5-turbo", messages)
    try:
        response = json.loads(response) if response else None
    except json.JSONDecodeError:
        print(f"Invalid JSON response from LLM: {response}")
        response = None

    # Mark any existing diagnostic tests as deleted
    LLMOutputs.objects.filter(
        patient_id=patient_id,
        task_name="diagnostic_tests",
        is_deleted=False
    ).update(
        is_deleted=True,
        deleted_at=timezone.now()
    )

    # Create new diagnostic tests
    LLMOutputs.objects.create(
        patient=Patient.objects.get(id=patient_id),
        task_name="diagnostic_tests",
        llm_output=response
    )

    return response

def get_visit_encounters(patient_id):
    patient_data = get_patient_data(patient_id)
    system_prompt = """
        Given the following patient visit data, return a JSON array of encounters in this schema:
        [
            {
                "title": "Visit Title",
                "date": "MMM DD, YYYY HH:MM",
                "reason": "Reason for visit",
                "provider": "Provider name",
                "department": "Department name",
                "status": "Status of visit",
                "notes": "Notes from visit"
            }
        ]
        Only include relevant, concise, and clinically accurate information.
        Respond ONLY with a valid JSON array.
        Do not include any extra text, markdown, or explanation.
    """
    user_prompt = f"""
        Here is the patients data:
        {patient_data}
    """

    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    response = llm_service.get_response("gpt-3.5-turbo", messages)
    try:
        response = json.loads(response) if response else None
    except json.JSONDecodeError:
        print(f"Invalid JSON response from LLM: {response}")
        response = None

    # Mark any existing visit encounters as deleted
    LLMOutputs.objects.filter(
        patient_id=patient_id,
        task_name="visit_encounters",
        is_deleted=False
    ).update(
        is_deleted=True,
        deleted_at=timezone.now()
    )

    # Create new visit encounters
    LLMOutputs.objects.create(
        patient=Patient.objects.get(id=patient_id),
        task_name="visit_encounters",
        llm_output=response
    )

    return response

def get_structured_clinical_notes(patient_id):
    patient_data = get_patient_data(patient_id)
    system_prompt = """
        You are a highly skilled clinical documentation assistant. Your task is to extract structured clinical notes from unstructured or raw medical text.

        Return the output strictly as a valid JSON object, with no extra formatting, no markdown, and no commentary. Follow the structure and rules exactly.

        Output format:
        [
            {
            "title": "Short descriptive title",
            "date": "YYYY-MM-DD or best available date string",
            "content": "The full original note text",
            "aiKeyPoints": [
                "Summary point 1",
                "Summary point 2",
                "Summary point 3"
            ],
            "type": "Type of note (e.g., Progress Note, Radiology Report, Discharge Summary)"
            }
        ]

        Field instructions:
        - title: Short, meaningful title summarizing the note, like "Initial Oncology Consult" or "Radiology Report - CT Chest".
        - date: Extract the date from the note in YYYY-MM-DD format. If unavailable, use "Unknown" or an approximate like "March 2023".
        - content: Paste the full original note content.
        - aiKeyPoints: Provide 2 to 5 bullet points summarizing key findings, decisions, or issues from the note.
        - type: Select a relevant note type such as "Progress Note", "Consult Note", "Radiology Report", "Discharge Summary", etc.

        Rules:
        - If multiple notes are present in the input, return one object per note.
        - Do not fabricate data. If a field is unclear or missing, use "Unknown".
        - Only return raw JSON as described above. Do not include markdown, headings, explanations, or extra text of any kind.
    """
    user_prompt = f"""
        Here is the patient's data:
        {patient_data}
    """
    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    response = llm_service.get_response("gpt-3.5-turbo", messages)
    try:
        response = json.loads(response) if response else None
    except json.JSONDecodeError:
        print(f"Invalid JSON response from LLM: {response}")
        response = None

    # Mark any existing structured clinical notes as deleted
    LLMOutputs.objects.filter(
        patient_id=patient_id,
        task_name="structured_clinical_notes",
        is_deleted=False
    ).update(
        is_deleted=True,
        deleted_at=timezone.now()
    )

    # Create new structured clinical notes
    LLMOutputs.objects.create(
        patient=Patient.objects.get(id=patient_id),
        task_name="structured_clinical_notes",
        llm_output=response
    )

    return response
