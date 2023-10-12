import { Component, OnInit } from '@angular/core';
import { FormInstance, FormInstanceExt, FormInstanceMaskWrapper, FormWrapper } from '@codeffekt/ce-core-data';

const subForm: FormInstance = {
  id: "12345",
  ctime: Date.now(),
  title: "SubForm",
  valid: true,
  root: "form-index-test",
  content: {
    name: {
      field: "name",
      type: "text",
      label: "Name",
      value: "My name"
    },
    count: {
      field: "count",
      type: "number",
      label: "Count",
      value: 124
    },
  }
};

const mask = FormWrapper.fromForm({
  id: "mask",
  root: "mask",
  title: "Mask",
  ctime: 0,
  valid: true,
  content: {
    mask: {
      field: "mask",
      type: "mask",
      value: {
        content: {
        }
      }
    },
    style: {
      type: "style",
      field: "style",
      value: {
        orderBlock: [
          "full",
          "empty",
          "required"
        ],
        cards: [
          {
            title: "Les différentes variantes du type index",
            blocks: ["full", "empty", "required", "readonly"],            
          }
        ]
      }
    }
  }
})

@Component({
  selector: 'app-form-index-page',
  templateUrl: './form-index-page.component.html',
  styleUrls: ['./form-index-page.component.scss']
})
export class FormIndexPageComponent implements OnInit {

  formWrapper = FormWrapper.fromForm({
    id: "form-index-test",
    ctime: Date.now(),
    title: "Test du form index block",
    valid: true,
    root: "form-index-test",
    content: {
      full: {
        root: "form-index-test",
        field: "full",
        type: "index",
        label: "SubForm",
        description: "Le block de type index ayant une référence vers un autre formulaire appelé sous-formulaire",
        params: {
          fields: ["name", "count"]
        },
        value: "12345"
      },
      required: {
        root: "form-index-test",
        field: "required",
        type: "index",
        label: "Required",
        description: "Le block de type index doit avoir une référence vers un autre formulaire",
        params: {
          fields: ["name", "count"],
          validators: [{ "name": "required" }],
        },
        value: "12345",
      },
      empty: {
        root: "form-index-test",
        field: "empty",
        type: "index",
        label: "Empty",
        description: "Le block de type index n'ayant pas de valeur de sous-formulaire",
      },
      readonly: {
        root: "form-index-test",
        field: "readonly",
        type: "index",
        label: "ReadOnly",
        readonly: true,
        params: {
          fields: ["name", "count"]
        },
        value: "12345",
        description: "Le block de type index en mode readonly ne peut pas être modifié",
      },
      disabled: {
        field: "disabled",
        type: "index",
        label: "Disabled",
        disabled: true,
        value: "12345"
      },

    },
    fields: {
      "required": subForm,
      "full": subForm,
      "readonly": subForm,
    }
  } as FormInstanceExt);

  formMask = mask as FormInstanceMaskWrapper;

  constructor() { }

  ngOnInit(): void {
  }

}
