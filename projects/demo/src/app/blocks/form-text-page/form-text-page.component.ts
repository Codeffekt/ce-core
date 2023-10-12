import { Component, OnInit } from '@angular/core';
import { FormInstanceExt, FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-form-text-page',
  templateUrl: './form-text-page.component.html',
  styleUrls: ['./form-text-page.component.scss']
})
export class FormTextPageComponent implements OnInit {

  formWrapper = FormWrapper.fromForm({
    id: "form-text-test",
    ctime: Date.now(),
    title: "Variantes du block de type text",
    valid: true,
    root: "form-text-test",
    content: {
      full: {        
        field: "full",
        type: "text",
        label: "Message",        
        value: "Ceci est un message du block texte"
      },
      required: {        
        field: "required",
        type: "text",
        label: "Required",
        description: "Le block de type texte doit avoir une valeur",        
        value: "12345",
      },
      empty: {        
        field: "empty",
        type: "text",
        label: "Empty",
        description: "Le block de type index n'ayant pas de valeur de sous-formulaire",
      },
      readonly: {        
        field: "readonly",
        type: "text",
        label: "ReadOnly",
        readonly: true,        
        value: "Ce texte ne peut être modifié",
        description: "Le block de type texte en mode readonly ne peut pas être modifié",
      },
      disabled: {
        field: "disabled",
        type: "text",
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
