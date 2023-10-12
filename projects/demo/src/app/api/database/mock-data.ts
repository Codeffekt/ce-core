import { FormInstance } from "@codeffekt/ce-core-data";
interface Database {
    [table: string]: FormInstance[];
}

export const DEMO_TABLE = "DEMO_TABLE";
export const ARRAY_TABLE = "EXAMPLE_FORM_ARRAY";

export const DATABASE: Database = {
    [DEMO_TABLE]: [
        {
            id: "form-text",
            root: "form-text",
            ctime: 0,
            title: "Test form text",
            valid: true,
            content: {
                text: {
                    type: "text",
                    field: "text",
                    label: "Texte"
                }
            }
        },
        {
            id: "form-asset",
            root: "form-asset",
            ctime: 0,
            title: "Formulaires asset",
            valid: true,
            content: {
                photo: {
                    type: "asset",
                    field: "photo",
                    label: "Photo",
                    // value: "818dcf2b-ccad-43e6-93a0-dc5ff520f1ee"
                },
                text: {
                    type: "text",
                    field: "text",
                    label: "Texte"
                }
            }
        },
        {
            "id": "form-timestamp",
            "root": "forms-context-final",
            "ctime": 1606726182039,
            "mtime": 1609919868099,
            "table": "test",
            "title": "Formulaire de démonstration",
            "valid": true,
            "author": "3a9f3651-1f66-11eb-83d8-2f21f5d17b1d",
            "content": {
                "timestamp": {
                    "type": "timestamp",
                    "field": "timestamp",
                    "label": "Date / Heure",
                    "value": 1606726182039,
                    "params": {
                        "dateFormat": "YYYY-MM-DD",
                        "timeFormat": "HH:mm",
                        "date": true,
                        "time": true
                    }
                }
            }
        }        
    ],
    [ARRAY_TABLE]: [        
    ]   
};

export const MASKS_DATABASE: FormInstance[] = [   
];

export const STYLES_DATABASE: FormInstance[] = [    
];
