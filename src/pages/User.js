const user = {
    id: 1,
    username: 'admin',
    "email": "admin@demo.com",
    "first_name": "Test",
    "middle_name": null,
    "last_name": "Demo",
    "fullname": "Demo, Test",
    "salutation": null,
    "date_of_birthday": null,
    "gender": null,
    "timezone": "America/Los_Angeles",
    "avatar": "",
    "role": "sysadmin",
    "language": {
        "id": "en",
        "name": "English"
    },
    "preferred_language": null,
    "permissions": {
        "home": {
            "menu_engagement": true,
            "menu_widget": false,
            "menu_find_patient": false,
            "menu_task_center": false,
            "menu_appointment": false
        },
        "profile": {
            "administrative": true,
            "blood_type": true,
            "blood_type_edit": true,
            "date_of_birth_edit": true,
            "gender_edit": true,
            "medical_record_number": true,
            "medical_record_number_edit": false,
            "social_security": true,
            "social_security_edit": false,
            "national_provider": false,
            "national_provider_edit": false
        },
        "find_patient": {
            "access": false
        },
        "appointments": {
            "access": true,
            "add": false,
            "add_statuses": true,
            "export": true
        },
        "labs": {
            "access": true,
            "menu": false,
            "add": true
        },
        "document_results": {
            "access": true,
            "menu": false
        },
        "wellness": {
            "access": true,
            "menu": false,
            "add": true
        },
        "prescriptions": {
            "access": true,
            "add": true
        },
        "eye_prescriptions": {
            "access": true
        },
        "medical_records": {
            "access": true,
            "menu": false,
            "conditions_add": true,
            "allergy_add": true,
            "medication_add": true,
            "immunization_add": true,
            "procedure_add": true,
            "social_history_add": true,
            "family_history_add": true,
            "health_summary_add": true,
            "medical_file_add": true
        },
        "billing": {
            "access": true,
            "menu": false
        },
        "forms": {
            "access": true,
            "menu": false
        },
        "task_center": {
            "access": true,
            "management": true
        },
        "reports": {
            "access": true
        },
        "settings": {
            "access": false,
            "config": true,
            "client": true
        },
        "users": {
            "access": true
        },
        "support": {
            "access": false
        },
        "help_desk": {
            "access": true
        },
        "care_plans": {
            "access": false,
            "templates": true
        },
        "observables": {
            "access": true,
            "all": true
        },
        "conversations": {
            "tags_add": false,
            "sender": false
        }
      }
  };

export default user;