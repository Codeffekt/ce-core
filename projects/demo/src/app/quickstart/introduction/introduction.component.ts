import { Component, OnInit } from '@angular/core';
import { FormInstance, FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  exampleFormInstance: FormInstance = {
    id: "example",
    ctime: Date.now(),
    title: "Example d'un formulaire",
    valid: true,
    root: "form-example",
    content: { 
      barcode: {
        field: "barcode",
        type: "barcode",
        label: "Code-barres",
        value: {
          text: "1365478521"
        },
        params: {
          displayInline: true
        }
      },
      status: {        
        field: "status",
        type: "select",
        label: "Etat du matériel",        
        value: "BE",
        params: {
          options: [          
            {
              label: "Bon état",
              value: "BE"
            },
            {
              label: "Acceptable",
              value: "ACC",
            },
            {
              label: "Hors Service",
              value: "HS"
            }
          ]
        }
      },
      comment: {        
        field: "comment",
        type: "text",
        label: "Commentaire",        
        value: ""
      },    
    }
  };

  exampleForm = FormWrapper.fromForm(this.exampleFormInstance);

  exampleFormStr = JSON.stringify(this.exampleFormInstance, null, 2);

  constructor() { }

  ngOnInit(): void {
  }

}
