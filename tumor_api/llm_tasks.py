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
    
    response = llm_service.get_response("gpt-4", messages)
    
    if response:
        try:
            # Parse the JSON response
            ai_analysis = json.loads(response)
            
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