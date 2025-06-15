from tumor_api.llm_service import LLMService
from tumor_api.models import (
    Patient, Visit, Observation, DiagnosticReport, MedicationStatement, 
    Immunization, CarePlan, PhysicianNotes, Actor, Workspace
)
from tumor_api.utils import DiagnosticReportStatus
from django.utils import timezone
from datetime import datetime
import json
import uuid


def _trigger_patient_llm_tasks(patient_id):
    """
    Trigger LLM task generation in a background thread for a newly created patient.
    """
    import threading
    
    def run_llm_tasks():
        try:
            from tumor_api.llm_tasks import (
                get_risk_assessment, get_patient_summary, get_diagnostic_tests,
                get_visit_encounters, get_structured_clinical_notes
            )
            
            print(f"🚀 Starting LLM tasks for patient {patient_id}")
            
            # Run all LLM tasks
            tasks = [
                ("risk_assessment", get_risk_assessment),
                ("patient_summary", get_patient_summary),
                ("diagnostic_tests", get_diagnostic_tests),
                ("visit_encounters", get_visit_encounters),
                ("structured_clinical_notes", get_structured_clinical_notes)
            ]
            
            completed_tasks = []
            failed_tasks = []
            
            for task_name, task_function in tasks:
                try:
                    print(f"  📋 Running {task_name}...")
                    result = task_function(patient_id)
                    if result:
                        completed_tasks.append(task_name)
                        print(f"  ✅ {task_name} completed successfully")
                    else:
                        failed_tasks.append(task_name)
                        print(f"  ⚠️ {task_name} returned empty result")
                except Exception as e:
                    failed_tasks.append(task_name)
                    print(f"  ❌ {task_name} failed: {str(e)}")
            
            print(f"🎉 LLM tasks completed for patient {patient_id}")
            print(f"  ✅ Successful: {completed_tasks}")
            if failed_tasks:
                print(f"  ❌ Failed: {failed_tasks}")
                
        except Exception as e:
            print(f"❌ Error running LLM tasks for patient {patient_id}: {str(e)}")
            import traceback
            traceback.print_exc()
    
    # Start the LLM tasks in a background thread
    thread = threading.Thread(target=run_llm_tasks)
    thread.daemon = True  # Thread will die when main program exits
    thread.start()
    
    print(f"🚀 LLM tasks started in background for patient {patient_id}")


def generate_patient_data():
    """
    Generate patient data using LLM with the specified prompt
    """
    system_prompt = """
    You are a helpful assistant and also an expert in lung cancer and lung related cases and you have a hospital, and you generate data for me, i need your help in creating some data. You have data under the following tables, Patient whihc containes name dob etc, Visit which is related to the patient and time at which it happened is recorded, Observations done during which can be be vitals (temparature, bp, weight, oxygen), or symptoms, opbesvations are madatory for every visit, Medication Statements given during a visit given during visits for the relvant diseases, Imunization done during a visit something they took at birth or some thing like the covid vaccine, Care Plan which is something that is provided during a visit which is something like a diet plan etc. The final output should always be something like this list of patients and this is what each patient need to have {Patient:{name: random name,dob: random date,address: random address,contact: phone_number,visits: [{visit_id: 1,visit_time: random time,vitals: {temp: random_temp,bp: random bp measuremnet,oxygen: random oxygen},Symptoms: random symptoms,reports: {key called free text report with the text report which should be very detailed, a big report if taken that visit, a status key on if its normal or abnormal}, medication: if given that that visit, physisian notes: notes relavent to the symptoms and report, care_plan: a care plan like diet or something like it to the patients}]}} and all the visits need to me shown. Also the fianl output needs to be in json formal, no new lines
    """
    
    user_prompt = """
    I need you to generate a 1 patients what have lung related diseases like COPD, TB, Asthama, Cystic Fibrosis with a random names and ages, that has come to your hospital OpenAI medical, and have come to your hospital several times before, since their birth. Everytime they came to you hospital, you have taken vitals, and recorded them as observations one example for it is they came to you about 6-7 times for various reasons but at the end have on of the lung releated diseases which needed some relavent diagnostic reports to taken, and a few followups to suggest relavent medication. make patient with all kinds of diseases, or they might not have had any diseases and i dont wanna use random generators, please generate it for me, i dont want to replicate them myself, i want you to do it for me. The assumptions have to reasonable Eg: patient cannot have normal and lung cancer confirmation in couple of days. There should be reasonable time gap in disease getting worse. Should be same for other diseases as well
    """

    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    response = llm_service.get_response("openai/gpt-4.1-mini", messages)
    
    try:
        # Parse the JSON response
        patient_data = json.loads(response) if response and isinstance(response, str) else None
        return patient_data
    except json.JSONDecodeError:
        print(f"Invalid JSON response from LLM: {response}")
        return None


def populate_normal_patient_details(patient_data):
    """
    Populate the database with the patient data received from LLM
    """
    if not patient_data:
        return {"error": "No patient data provided"}
    
    try:
        # Get or create a default workspace and actor
        workspace, _ = Workspace.objects.get_or_create(
            name="default",
            defaults={"display_name": "Default Workspace"}
        )
        
        actor, _ = Actor.objects.get_or_create(
            name="OpenAI Medical Staff",
            defaults={"display_name": "OpenAI Medical Staff"}
        )
        
        created_patients = []
        
        # Handle both single patient and list of patients
        patients_list = patient_data if isinstance(patient_data, list) else [patient_data]
        
        for patient_info in patients_list:
            # Extract patient basic information
            patient_details = patient_info.get('Patient', patient_info)
            
            # Parse date of birth
            dob_str = patient_details.get('dob', '')
            try:
                # Try different date formats
                if '/' in dob_str:
                    dob = datetime.strptime(dob_str, '%m/%d/%Y').date()
                elif '-' in dob_str:
                    dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
                else:
                    # Default to a reasonable date if parsing fails
                    dob = datetime(1980, 1, 1).date()
            except ValueError:
                dob = datetime(1980, 1, 1).date()
            
            # Create Patient
            patient = Patient.objects.create(
                patient_id=str(uuid.uuid4())[:8],  # Generate unique patient ID
                name=patient_details.get('name', 'Unknown Patient'),
                dob=dob,
                contact=patient_details.get('contact', ''),
                address=patient_details.get('address', ''),
                gender='male',  # Default, can be enhanced later
                workspace=workspace
            )
            
            # Process visits
            visits = patient_details.get('visits', [])
            for visit_info in visits:
                # Parse visit time
                visit_time_str = visit_info.get('visit_time', '')
                try:
                    if '/' in visit_time_str:
                        visit_time = datetime.strptime(visit_time_str, '%m/%d/%Y %H:%M')
                    else:
                        # Default to current time if parsing fails
                        visit_time = timezone.now()
                except (ValueError, TypeError):
                    visit_time = timezone.now()
                
                # Create Visit
                visit = Visit.objects.create(
                    patient=patient,
                    scheduled_at=visit_time,
                    actor_assigned=actor
                )
                
                # Create Observations (vitals and symptoms)
                vitals = visit_info.get('vitals', {})
                symptoms = visit_info.get('Symptoms', visit_info.get('symptoms', ''))
                
                # Create vital observations
                if vitals.get('temp'):
                    Observation.objects.create(
                        focus=f"Temperature: {vitals['temp']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('bp'):
                    Observation.objects.create(
                        focus=f"Blood Pressure: {vitals['bp']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('oxygen'):
                    Observation.objects.create(
                        focus=f"Oxygen Saturation: {vitals['oxygen']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('weight'):
                    Observation.objects.create(
                        focus=f"Weight: {vitals['weight']}",
                        patient=patient,
                        visit=visit
                    )
                
                # Create symptom observation
                if symptoms:
                    Observation.objects.create(
                        focus=f"Symptoms: {symptoms}",
                        patient=patient,
                        visit=visit
                    )
                
                # Create Diagnostic Report
                reports = visit_info.get('reports', {})
                if reports:
                    report_text = reports.get('free text report', reports.get('report', ''))
                    report_status = reports.get('status', 'normal')
                    
                    if report_text:
                        DiagnosticReport.objects.create(
                            free_text_report=report_text[:400],  # Limit to model field length
                            patient=patient,
                            visit=visit,
                            status=DiagnosticReportStatus.NORMAL if report_status.lower() == 'normal' else DiagnosticReportStatus.ABNORMAL
                        )
                
                # Create Medication Statements
                if visit_info.get('medication'):
                    medications = visit_info.get('medication', [])
                    if isinstance(medications, str):
                        medications = [medications]
                
                    for medication in medications:
                        if medication:
                            MedicationStatement.objects.create(
                                patient=patient,
                                medication_text=medication[:200],  # Limit to model field length
                                dosage="As prescribed"  # Default dosage
                            )
                
                # Create Physician Notes
                physician_notes = visit_info.get('physisian notes', visit_info.get('physician_notes', ''))
                if physician_notes:
                    PhysicianNotes.objects.create(
                        patient=patient,
                        notes=physician_notes[:300],  # Limit to model field length
                        visit=visit
                    )
                
                # Create Care Plan
                care_plan = visit_info.get('care_plan', '')
                if care_plan:
                    CarePlan.objects.create(
                        patient=patient,
                        care_plan_provided=care_plan[:300]  # Limit to model field length
                    )
                
                # Handle immunizations if present
                immunizations = visit_info.get('immunizations', [])
                if isinstance(immunizations, str):
                    immunizations = [immunizations]
                
                for immunization in immunizations:
                    if immunization:
                        Immunization.objects.create(
                            patient=patient,
                            visit=visit,
                            vaccine=immunization[:200]  # Limit to model field length
                        )
            
            # Trigger LLM tasks in background for this patient
            _trigger_patient_llm_tasks(patient.pk)
            
            created_patients.append({
                'patient_id': patient.pk,
                'name': patient.name,
                'created_visits': len(visits)
            })
        
        return {
            'status': 'success',
            'message': f'Successfully created {len(created_patients)} patient(s)',
            'patients': created_patients
        }
        
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Error creating patient data: {str(e)}'
        }


def generate_lung_related_patient_data():
    """
    Generate lung-related patient data using LLM with the specified prompt
    """
    system_prompt = """
    You are a helpful assistant and also an expert in lung cancer and lung related cases and you have a hospital, and you generate data for me, i need your help in creating some data. You have data under the following tables, Patient whihc containes name dob etc, Visit which is related to the patient and time at which it happened is recorded, Observations done during which can be be vitals (temparature, bp, weight, oxygen), or symptoms, opbesvations are madatory for every visit, Medication Statements given during a visit given during visits for the relvant diseases, Imunization done during a visit something they took at birth or some thing like the covid vaccine, Care Plan which is something that is provided during a visit which is something like a diet plan etc. The final output should always be something like this list of patients and this is what each patient need to have {Patient:{name: random name,dob: random date,address: random address,contact: phone_number,visits: [{visit_id: 1,visit_time: random time,vitals: {temp: random_temp,bp: random bp measuremnet,oxygen: random oxygen},Symptoms: random symptoms,reports: {key called free text report with the text report which should be very detailed, a big report if taken that visit, a status key on if its normal or abnormal}, medication: if given that that visit, physisian notes: notes relavent to the symptoms and report, care_plan: a care plan like diet or something like it to the patients}]}} and all the visits need to me shown. Also the fianl output needs to be in json formal, no new lines
    """
    
    user_prompt = """
    I need you to generate a 1 patients what have lung related diseases like COPD, TB, Asthama, Cystic Fibrosis with a random names and ages, that has come to your hospital OpenAI medical, and have come to your hospital several times before, since their birth. Everytime they came to you hospital, you have taken vitals, and recorded them as observations one example for it is they came to you about 6-7 times for various reasons but at the end have on of the lung releated diseases which needed some relavent diagnostic reports to taken, and a few followups to suggest relavent medication. make patient with all kinds of diseases, or they might not have had any diseases and i dont wanna use random generators, please generate it for me, i dont want to replicate them myself, i want you to do it for me. The assumptions have to reasonable Eg: patient cannot have normal and lung cancer confirmation in couple of days. There should be reasonable time gap in disease getting worse. Should be same for other diseases as well
    """

    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    response = llm_service.get_response("openai/gpt-4.1-mini", messages)
    
    try:
        # Parse the JSON response
        patient_data = json.loads(response) if response and isinstance(response, str) else None
        return patient_data
    except json.JSONDecodeError:
        print(f"Invalid JSON response from LLM: {response}")
        return None


def populate_lung_related_patient_details(patient_data):
    """
    Populate the database with the lung-related patient data received from LLM
    """
    if not patient_data:
        return {"error": "No patient data provided"}
    
    try:
        # Get or create a default workspace and actor
        workspace, _ = Workspace.objects.get_or_create(
            name="default",
            defaults={"display_name": "Default Workspace"}
        )
        
        actor, _ = Actor.objects.get_or_create(
            name="OpenAI Medical Staff - Lung Specialist",
            defaults={"display_name": "OpenAI Medical Staff - Lung Specialist"}
        )
        
        created_patients = []
        
        # Handle both single patient and list of patients
        patients_list = patient_data if isinstance(patient_data, list) else [patient_data]
        
        for patient_info in patients_list:
            # Extract patient basic information
            patient_details = patient_info.get('Patient', patient_info)
            
            # Parse date of birth
            dob_str = patient_details.get('dob', '')
            try:
                # Try different date formats
                if '/' in dob_str:
                    dob = datetime.strptime(dob_str, '%m/%d/%Y').date()
                elif '-' in dob_str:
                    dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
                else:
                    # Default to a reasonable date if parsing fails
                    dob = datetime(1980, 1, 1).date()
            except ValueError:
                dob = datetime(1980, 1, 1).date()
            
            # Create Patient with lung-related flag
            patient = Patient.objects.create(
                patient_id=str(uuid.uuid4())[:8],  # Generate unique patient ID
                name=patient_details.get('name', 'Unknown Patient'),
                dob=dob,
                contact=patient_details.get('contact', ''),
                address=patient_details.get('address', ''),
                gender='male',  # Default, can be enhanced later
                workspace=workspace
            )
            
            # Process visits
            visits = patient_details.get('visits', [])
            for visit_info in visits:
                # Parse visit time
                visit_time_str = visit_info.get('visit_time', '')
                try:
                    if '/' in visit_time_str:
                        visit_time = datetime.strptime(visit_time_str, '%m/%d/%Y %H:%M')
                    else:
                        # Default to current time if parsing fails
                        visit_time = timezone.now()
                except (ValueError, TypeError):
                    visit_time = timezone.now()
                
                # Create Visit
                visit = Visit.objects.create(
                    patient=patient,
                    scheduled_at=visit_time,
                    actor_assigned=actor
                )
                
                # Create Observations (vitals and symptoms)
                vitals = visit_info.get('vitals', {})
                symptoms = visit_info.get('Symptoms', visit_info.get('symptoms', ''))
                
                # Create vital observations
                if vitals.get('temp'):
                    Observation.objects.create(
                        focus=f"Temperature: {vitals['temp']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('bp'):
                    Observation.objects.create(
                        focus=f"Blood Pressure: {vitals['bp']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('oxygen'):
                    Observation.objects.create(
                        focus=f"Oxygen Saturation: {vitals['oxygen']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('weight'):
                    Observation.objects.create(
                        focus=f"Weight: {vitals['weight']}",
                        patient=patient,
                        visit=visit
                    )
                
                # Create symptom observation with lung-specific focus
                if symptoms:
                    Observation.objects.create(
                        focus=f"Lung-related Symptoms: {symptoms}",
                        patient=patient,
                        visit=visit
                    )
                
                # Create Diagnostic Report
                reports = visit_info.get('reports', {})
                if reports:
                    report_text = reports.get('free text report', reports.get('report', ''))
                    report_status = reports.get('status', 'normal')
                    
                    if report_text:
                        DiagnosticReport.objects.create(
                            free_text_report=report_text[:400],  # Limit to model field length
                            patient=patient,
                            visit=visit,
                            status=DiagnosticReportStatus.NORMAL if report_status.lower() == 'normal' else DiagnosticReportStatus.ABNORMAL
                        )
                
                # Create Medication Statements
                if visit_info.get('medication'):
                    medications = visit_info.get('medication', [])
                    if isinstance(medications, str):
                        medications = [medications]
                    
                    for medication in medications:
                        if medication:
                            MedicationStatement.objects.create(
                                patient=patient,
                                medication_text=medication[:200],  # Limit to model field length
                                dosage="As prescribed"  # Default dosage
                            )
                
                # Create Physician Notes
                physician_notes = visit_info.get('physisian notes', visit_info.get('physician_notes', ''))
                if physician_notes:
                    PhysicianNotes.objects.create(
                        patient=patient,
                        notes=physician_notes[:300],  # Limit to model field length
                        visit=visit
                    )
                
                # Create Care Plan
                care_plan = visit_info.get('care_plan', '')
                if care_plan:
                    CarePlan.objects.create(
                        patient=patient,
                        care_plan_provided=care_plan[:300]  # Limit to model field length
                    )
                
                # Handle immunizations if present
                immunizations = visit_info.get('immunizations', [])
                if isinstance(immunizations, str):
                    immunizations = [immunizations]
                
                for immunization in immunizations:
                    if immunization:
                        Immunization.objects.create(
                            patient=patient,
                            visit=visit,
                            vaccine=immunization[:200]  # Limit to model field length
                        )
            
            # Trigger LLM tasks in background for this patient
            _trigger_patient_llm_tasks(patient.pk)
            
            created_patients.append({
                'patient_id': patient.pk,
                'name': patient.name,
                'created_visits': len(visits),
                'patient_type': 'lung_related'
            })
        
        return {
            'status': 'success',
            'message': f'Successfully created {len(created_patients)} lung-related patient(s)',
            'patients': created_patients
        }
        
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Error creating lung-related patient data: {str(e)}'
        }


def generate_lung_cancer_patient_data():
    """
    Generate lung cancer patient data using LLM with the comprehensive oncology prompt
    """
    system_prompt = """
    You are a helpful assistant and also an expert oncologist specializing in lung cancer and pulmonary oncology. You operate a comprehensive cancer center and generate realistic patient data for research purposes. You have data across the following clinical areas: Patient demographics and medical history, Clinical Encounters which track patient visits and consultations, Pathology Reports from biopsies and tissue samples, Diagnostic Tests including imaging studies (CT, PET, MRI), laboratory results, and pulmonary function tests, Treatment Plans including chemotherapy, radiation, immunotherapy, and surgical interventions, Physician Notes documenting clinical assessments and decision-making, Care Plans covering supportive care, palliative measures, and follow-up protocols. The final output should be structured as: {Patient: {name: realistic_name, dob: appropriate_date, address: realistic_address, contact: phone_number, medical_history: {smoking_history, family_history, comorbidities}, encounters: [{encounter_id: sequential_number, encounter_date: chronological_date, encounter_type: screening/diagnostic/treatment/follow_up, vitals: {temperature, blood_pressure, weight, oxygen_saturation, performance_status}, symptoms: relevant_symptoms, diagnostic_reports: [{test_type: CT_chest/PET_scan/biopsy/bloodwork, test_date: date, results: detailed_findings, interpretation: normal/abnormal/suspicious, pathology_reports with specimen_type, histology, staging, molecular_markers, grade}, physician_notes: comprehensive_clinical_assessment, treatment_administered: chemotherapy/radiation/surgery_details, care_plan: supportive_care_recommendations}]}} All encounters must be chronologically ordered and clinically realistic. Also when there are reports they need to be big and descriptive Output must be in JSON format with no line breaks.
    """
    
    user_prompt = """
    Generate 1 comprehensive lung cancer patient for our oncology center at DIFFERENT phases of their cancer journey - do not make them all cancer-free success stories. Include patients across different lung cancer types (NSCLC adenocarcinoma, squamous cell, small cell lung cancer, and rare subtypes) and various current states: 1) Recently diagnosed, still undergoing staging workup, 2) Currently receiving first-line treatment (chemotherapy, radiation, immunotherapy), 3) Experiencing treatment complications or side effects, 4) Disease progression requiring treatment changes, 5) Advanced/metastatic disease receiving palliative care, 6) Post-treatment surveillance (some with recurrence, some disease-free), 7) Patients who declined treatment or are treatment-resistant, 8) End-of-life care scenarios. Each patient should have 6-15 encounters representing their current position in the cancer continuum. Include diverse presentation patterns: screening-detected cases, symptom-driven presentations (persistent cough, hemoptysis, dyspnea, chest pain, weight loss, bone pain from metastases), cases with comorbid conditions affecting treatment decisions, different staging scenarios (Stage I operable, Stage III locally advanced, Stage IV metastatic), various treatment responses (complete response, partial response, stable disease, progressive disease), treatment complications (neutropenia, neuropathy, pneumonitis, secondary infections), and realistic disease trajectories. Each encounter must include appropriate diagnostic tests, pathology reports when relevant, detailed physician notes reflecting current clinical challenges, and care plans addressing immediate needs. Ensure realistic timelines - show actual cancer progression patterns, treatment response curves, and complications as they naturally occur. Include patients with poor prognosis, treatment failures, quality of life issues, and difficult clinical decisions. Make demographics diverse (age 40-85, various smoking histories, different socioeconomic backgrounds affecting care access). The goal is to represent the full spectrum of lung cancer patient experiences, not just positive outcomes.
    """

    llm_service = LLMService()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    response = llm_service.get_response("openai/gpt-4.1-mini", messages)
    
    try:
        # Parse the JSON response
        patient_data = json.loads(response) if response and isinstance(response, str) else None
        return patient_data
    except json.JSONDecodeError:
        print(f"Invalid JSON response from LLM: {response}")
        return None


def populate_lung_cancer_patient_details(patient_data):
    """
    Populate the database with the lung cancer patient data received from LLM
    """
    if not patient_data:
        return {"error": "No patient data provided"}
    
    try:
        # Get or create a default workspace and actor
        workspace, _ = Workspace.objects.get_or_create(
            name="default",
            defaults={"display_name": "Default Workspace"}
        )
        
        actor, _ = Actor.objects.get_or_create(
            name="Oncology Center - Lung Cancer Specialist",
            defaults={"display_name": "Oncology Center - Lung Cancer Specialist"}
        )
        
        created_patients = []
        
        # Handle both single patient and list of patients
        patients_list = patient_data if isinstance(patient_data, list) else [patient_data]
        
        for patient_info in patients_list:
            # Extract patient basic information
            patient_details = patient_info.get('Patient', patient_info)
            
            # Parse date of birth
            dob_str = patient_details.get('dob', '')
            try:
                # Try different date formats
                if '/' in dob_str:
                    dob = datetime.strptime(dob_str, '%m/%d/%Y').date()
                elif '-' in dob_str:
                    dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
                else:
                    # Default to a reasonable date if parsing fails
                    dob = datetime(1960, 1, 1).date()  # Older default for cancer patients
            except ValueError:
                dob = datetime(1960, 1, 1).date()
            
            # Create Patient with cancer-specific details
            patient = Patient.objects.create(
                patient_id=str(uuid.uuid4())[:8],  # Generate unique patient ID
                name=patient_details.get('name', 'Unknown Cancer Patient'),
                dob=dob,
                contact=patient_details.get('contact', ''),
                address=patient_details.get('address', ''),
                gender='male',  # Default, can be enhanced later
                workspace=workspace
            )
            
            # Process encounters (more detailed for cancer patients)
            encounters = patient_details.get('encounters', [])
            for encounter_info in encounters:
                # Parse encounter date
                encounter_date_str = encounter_info.get('encounter_date', '')
                try:
                    if '/' in encounter_date_str:
                        encounter_date = datetime.strptime(encounter_date_str, '%m/%d/%Y %H:%M')
                    elif '-' in encounter_date_str and ' ' in encounter_date_str:
                        encounter_date = datetime.strptime(encounter_date_str, '%Y-%m-%d %H:%M')
                    else:
                        # Default to current time if parsing fails
                        encounter_date = timezone.now()
                except (ValueError, TypeError):
                    encounter_date = timezone.now()
                
                # Create Visit (encounter)
                visit = Visit.objects.create(
                    patient=patient,
                    scheduled_at=encounter_date,
                    actor_assigned=actor
                )
                
                # Create Observations (vitals and symptoms)
                vitals = encounter_info.get('vitals', {})
                symptoms = encounter_info.get('symptoms', '')
                
                # Create vital observations for cancer patients
                if vitals.get('temperature'):
                    Observation.objects.create(
                        focus=f"Temperature: {vitals['temperature']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('blood_pressure'):
                    Observation.objects.create(
                        focus=f"Blood Pressure: {vitals['blood_pressure']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('oxygen_saturation'):
                    Observation.objects.create(
                        focus=f"Oxygen Saturation: {vitals['oxygen_saturation']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('weight'):
                    Observation.objects.create(
                        focus=f"Weight: {vitals['weight']}",
                        patient=patient,
                        visit=visit
                    )
                
                if vitals.get('performance_status'):
                    Observation.objects.create(
                        focus=f"Performance Status: {vitals['performance_status']}",
                        patient=patient,
                        visit=visit
                    )
                
                # Create symptom observation with cancer-specific focus
                if symptoms:
                    Observation.objects.create(
                        focus=f"Cancer Symptoms: {symptoms}",
                        patient=patient,
                        visit=visit
                    )
                
                # Create Diagnostic Reports (comprehensive for cancer patients)
                diagnostic_reports = encounter_info.get('diagnostic_reports', [])
                if isinstance(diagnostic_reports, dict):
                    diagnostic_reports = [diagnostic_reports]
                
                for report in diagnostic_reports:
                    if report and isinstance(report, dict):
                        test_type = report.get('test_type', 'Unknown Test')
                        results = report.get('results', '')
                        interpretation = report.get('interpretation', 'pending')
                        
                        if results:
                            # Create main diagnostic report
                            report_text = f"{test_type}: {results}"
                            if len(report_text) > 400:
                                report_text = report_text[:400]
                            
                            DiagnosticReport.objects.create(
                                free_text_report=report_text,
                                patient=patient,
                                visit=visit,
                                status=DiagnosticReportStatus.NORMAL if interpretation.lower() == 'normal' else DiagnosticReportStatus.ABNORMAL
                            )
                        
                        # Handle pathology reports if present
                        pathology_reports = report.get('pathology_reports', {})
                        if pathology_reports and isinstance(pathology_reports, dict):
                            pathology_text = f"Pathology - Specimen: {pathology_reports.get('specimen_type', 'N/A')}, "
                            pathology_text += f"Histology: {pathology_reports.get('histology', 'N/A')}, "
                            pathology_text += f"Staging: {pathology_reports.get('staging', 'N/A')}, "
                            pathology_text += f"Grade: {pathology_reports.get('grade', 'N/A')}"
                            
                            if len(pathology_text) > 400:
                                pathology_text = pathology_text[:400]
                            
                            DiagnosticReport.objects.create(
                                free_text_report=pathology_text,
                                patient=patient,
                                visit=visit,
                                status=DiagnosticReportStatus.ABNORMAL  # Pathology reports typically indicate issues
                            )
                
                # Create Treatment-related Medication Statements
                treatment_administered = encounter_info.get('treatment_administered', '')
                if treatment_administered:
                    MedicationStatement.objects.create(
                        patient=patient,
                        medication_text=treatment_administered[:200],  # Limit to model field length
                        dosage="As per oncology protocol"
                    )
                
                # Create Physician Notes (comprehensive for cancer patients)
                physician_notes = encounter_info.get('physician_notes', '')
                if physician_notes:
                    PhysicianNotes.objects.create(
                        patient=patient,
                        notes=physician_notes[:300],  # Limit to model field length
                        visit=visit
                    )
                
                # Create Care Plan
                care_plan = encounter_info.get('care_plan', '')
                if care_plan:
                    CarePlan.objects.create(
                        patient=patient,
                        care_plan_provided=care_plan[:300]  # Limit to model field length
                    )
                
                # Handle encounter type as an observation
                encounter_type = encounter_info.get('encounter_type', '')
                if encounter_type:
                    Observation.objects.create(
                        focus=f"Encounter Type: {encounter_type}",
                        patient=patient,
                        visit=visit
                    )
            
            # Store medical history as observations
            medical_history = patient_details.get('medical_history', {})
            if medical_history and isinstance(medical_history, dict):
                # Create a visit for medical history if we have encounters
                if encounters:
                    first_visit = Visit.objects.filter(patient=patient).first()
                    if first_visit:
                        for key, value in medical_history.items():
                            if value:
                                Observation.objects.create(
                                    focus=f"Medical History - {key}: {value}",
                                    patient=patient,
                                    visit=first_visit
                                )
            
            # Trigger LLM tasks in background for this patient
            _trigger_patient_llm_tasks(patient.pk)
            
            created_patients.append({
                'patient_id': patient.pk,
                'name': patient.name,
                'created_encounters': len(encounters),
                'patient_type': 'lung_cancer'
            })
        
        return {
            'status': 'success',
            'message': f'Successfully created {len(created_patients)} lung cancer patient(s)',
            'patients': created_patients
        }
        
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Error creating lung cancer patient data: {str(e)}'
        } 