import { Component, OnInit } from '@angular/core';
import { FormInstanceExt, FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-form-select-page',
  templateUrl: './form-select-page.component.html',
  styleUrls: ['./form-select-page.component.scss']
})
export class FormSelectPageComponent implements OnInit {

  formWrapper = FormWrapper.fromForm({
    id: "form-select-test",
    ctime: Date.now(),
    title: "Variantes du block de type sélection",
    valid: true,
    root: "form-select-test",
    content: {
      full: {        
        field: "full",
        type: "select",
        label: "Environnement",        
        value: "Ceci est un message du block texte",
        params: {
          options: [
            {
              label: "Acceptable",
              value: "ACC",
            },
            {
              label: "Bon état",
              value: "BE"
            }
          ]
        }
      },
      required: {        
        field: "required",
        type: "select",
        label: "Required",
        description: "Le block de type texte doit avoir une valeur",        
        value: "12345",
      },
      empty: {        
        field: "empty",
        type: "select",
        label: "Empty",
        description: "Le block de type index n'ayant pas de valeur de sous-formulaire",
      },
      readonly: {        
        field: "readonly",
        type: "select",
        label: "ReadOnly",
        readonly: true,        
        value: "Ce texte ne peut être modifié",
        description: "Le block de type texte en mode readonly ne peut pas être modifié",
      },
      disabled: {
        field: "disabled",
        type: "select",
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
