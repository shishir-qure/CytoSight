from tumor_api.llm_service import LLMService
from tumor_api.models import Patient, LLMOutputs, ImageSeries, AIReport, DiagnosticReport
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
    response = json.loads(response) if response and isinstance(response, str) else None

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

def create_ai_report(patient, visit, image_series):
    """
    Creates an AIReport for the given ImageSeries using LLM analysis.

    Args:
        patient: Patient instance
        visit: Visit instance
        image_series: ImageSeries instance

    Returns:
        AIReport instance
    """
    # Get the diagnostic report text if available
    diagnostic_text = ""
    if image_series.diagnostic_report:
        diagnostic_text = image_series.diagnostic_report.free_text_report
    elif visit:
        # Try to get diagnostic reports from the visit
        reports = visit.visit_reports.all()
        if reports.exists():
            diagnostic_text = "\n".join([report.free_text_report for report in reports])

    # Count the number of DICOM files in the series
    dicom_count = image_series.dicom_files.count()

    system_prompt = """
You are a medical assistant reviewing radiology reports.
Your task is to find key CT findings that are associated with specific image slices. Focus on identifying the slice numbers mentioned in the report.
- CT image slice numbers are usually indicated in the format: `Series/Image: 4/123`.
- The second number (`123`) is the important one — the slice or image number.
- Treat each such entry as a distinct "key slice" that corresponds to an important clinical finding.
For each important clinical observation or nodule mentioned in the findings or impression section, locate the slice number(s) if provided in this format. You do not need to return structured data — simply understand how to identify findings tied to specific slices using that pattern.
Example cases from the report:
- "Series/Image: 4/123" → slice 123
- "Series/Image: 4/166" → slice 166
- "Series/Image: 4/245" → slice 245
Ignore any findings where the slice/image number is not explicitly mentioned.
Now read the report and focus only on the parts that mention `Series/Image` and the corresponding clinical observation.

Please analyze the provided radiology report and return your findings in the following JSON format:
{
    "scan_type": "CT" or "Xray" (determine from the report),
    "summary": "Brief summary of key findings",
    "keyslices_dict": [
        {
            "id": 1,
            "label": "anatomical_region_or_finding_name",
            "start_slice": slice_number,
            "end_slice": slice_number,
            "key_finding_description": "description of the finding",
            "file_links": ["list of relevant file paths if available"]
        }
    ]
}

make the label a small one, making it into acronyms etc.
"""

    user_prompt = f"""
Here is the radiology report to analyze:

Patient: {patient.name}
Visit Date: {visit.scheduled_at if visit else 'N/A'}
Series Description: {image_series.description}
Number of Images: {dicom_count}

Diagnostic Report:
{diagnostic_text if diagnostic_text else 'No diagnostic report available'}

Please analyze this report and extract key slice information according to the instructions.
"""

    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    response = llm_service.get_response("gpt-3.5-turbo", messages)
    print(response)
    
    
    if response:
        try:
            # Parse the JSON response
            ai_analysis = json.loads(response) if isinstance(response, str) else {}
            
            # Get all DICOM files from the image series, ordered by creation time
            dicom_files = image_series.dicom_files.order_by('created_at')
            print(dicom_files)
            
            # Create a list of file URLs indexed by position (assuming slice number corresponds to position)
            file_urls = []
            for dicom_file in dicom_files:
                # Get the file URL - you may need to adjust this based on your URL structure
                file_urls.append(dicom_file.file.url)
            
            # Populate file_links for each key slice
            if isinstance(ai_analysis.get('keyslices_dict'), list):
                for key_slice in ai_analysis['keyslices_dict']:
                    if isinstance(key_slice, dict):
                        start_slice = key_slice.get('start_slice', 0)
                        end_slice = key_slice.get('end_slice', 0)
                        
                        # Convert slice numbers to 0-based indices (assuming 1-based slice numbers)
                        start_idx = max(0, start_slice - 1) if start_slice > 0 else 0
                        end_idx = min(len(file_urls) - 1, end_slice - 1) if end_slice > 0 else start_idx
                        
                        # Get the relevant file URLs for this slice range
                        relevant_files = []
                        if start_idx < len(file_urls):
                            for i in range(start_idx, min(end_idx + 1, len(file_urls))):
                                relevant_files.append(file_urls[i])
                        
                        # Populate the file_links for this key slice
                        key_slice['file_links'] = relevant_files
            
            # Create the AIReport
            ai_report = AIReport.objects.create(
                image_series=image_series,
                scan_type=ai_analysis.get('scan_type', 'CT'),
                image_count=dicom_count,
                summary=ai_analysis.get('summary', ''),
                keyslices_dict=ai_analysis.get('keyslices_dict', [])
            )

            return ai_report

        except json.JSONDecodeError:
            # If JSON parsing fails, create a basic report
            ai_report = AIReport.objects.create(
                image_series=image_series,
                scan_type='CT',  # Default assumption
                image_count=dicom_count,
                summary=f"Analysis completed but could not parse structured data. Raw response: {response[:200]}...",
                keyslices_dict=[]
            )
            return ai_report
    else:
        # If LLM service fails, create a basic report
        ai_report = AIReport.objects.create(
            image_series=image_series,
            scan_type='CT',  # Default assumption
            image_count=dicom_count,
            summary="AI analysis failed - no response from LLM service",
            keyslices_dict=[]
        )
        return ai_report

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
        response = json.loads(response) if response and isinstance(response, str) else None
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
        response = json.loads(response) if response and isinstance(response, str) else None
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
        response = json.loads(response) if response and isinstance(response, str) else None
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
