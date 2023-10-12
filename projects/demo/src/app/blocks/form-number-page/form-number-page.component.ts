import { Component, OnInit } from '@angular/core';
import { FormInstanceExt, FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-form-number-page',
  templateUrl: './form-number-page.component.html',
  styleUrls: ['./form-number-page.component.scss']
})
export class FormNumberPageComponent implements OnInit {

  formWrapper = FormWrapper.fromForm({
    id: "form-number-test",
    ctime: Date.now(),
    title: "Variantes du block de type numérique (number)",
    valid: true,
    root: "form-number-test",
    content: {
      full: {        
        field: "full",
        type: "number",
        label: "Longueur",                
        value: 12.90,
        unit: "m",
      },
      required: {        
        field: "required",
        type: "number",
        label: "Required",
        description: "Le block de type numérique doit avoir une valeur",
        required: true,                
      },
      empty: {        
        field: "empty",
        type: "number",
        label: "Empty",
        description: "Le block de type numérique n'ayant pas de valeur de sous-formulaire",
      },
      readonly: {        
        field: "readonly",
        type: "number",
        label: "ReadOnly",
        readonly: true,        
        value: 3.14159,        
        description: "Le block de type numérique en mode readonly ne peut pas être modifié",
      },
      disabled: {
        field: "disabled",
        type: "number",
        label: "Disabled",
        disabled: true,
        value: "Texte disabled"
      },

    },    
  } as FormInstanceExt); 

  constructor() { }

  ngOnInit(): void {
  }

}
