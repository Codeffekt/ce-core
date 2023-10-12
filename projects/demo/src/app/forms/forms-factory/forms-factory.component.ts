import { Component, OnInit } from '@angular/core';
import { FormInstance, FormInstanceMaskWrapper, FormWrapper } from '@codeffekt/ce-core-data';
import { ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-forms-factory',
  templateUrl: './forms-factory.component.html',
  styleUrls: ['./forms-factory.component.scss'],
  providers: [   
  ]
})
export class FormsFactoryComponent implements OnInit {

  formWrapper: FormWrapper<any>;

  formInstance: FormInstance = {
    id: "a85771d431ab",
    root: "forms-queries-page",
    valid: true,
    ctime: 1530616131366,
    title: "Données contextuelles",
    content: {
      name: {
        type: "text",
        field: "name",
        label: "Name",
        value: ""
      },
      tech: {
        type: "select",
        field: "tech",
        label: "Technique",
        value: 0,
        params: {
          options: []
        }
      },
      barcode: {
        type: "barcode",
        field: "barcode",
        label: "Code-barres",
        value: {
          text: "256"
        }
      },
      timestamp: {
        type: "timestamp",
        field: "timestamp",
        label: "Date / Heure",        
        value: 1641311743317,
        params: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm:ss",
          date: true,
          time: true
        }
      },
      queries: {
        root: "forms-query-page",
        type: "formAssoc",
        field: "queries",
        label: "Queries",
        value: [],
        params: {
          fields: [
            "name",
            "page"
          ]
        }
      }
    }
  };

  formMaskWrapper: FormInstanceMaskWrapper;

  name = "";

  formWrapper$: ReplaySubject<FormWrapper<any>> = new ReplaySubject();

  formChange: any = {};

  constructor(
  ) {
    this.formWrapper = new FormWrapper(
      FormWrapper.createProps(this.formInstance),
      this.deepcopy(this.formInstance)
    );

    this.formMaskWrapper = FormInstanceMaskWrapper
      .withOnly(this.formWrapper.core,
        ["name", "tech", "timestamp"])
      .setFieldParams("tech", {
        options: [
        ]
      });
    this.formWrapper$.next(this.formWrapper);
  }

  ngOnInit(): void {
  }

  onFormChanges(wrapper: FormWrapper<any>) {
    //this.inputChange(null);
    //FormWrapper.setFormValue("name", Date.now().toString(), this.formInstance);    
    //this.formWrapper.props.name = Date.now().toString();
    //this.inputChange(null);
  }

  inputChange($event) {
    const now = Date.now();
    setTimeout(() => {
      console.log("INPUT CHANGE", now);
      FormWrapper.setFormValue("name", now.toString(), this.formInstance);
      FormWrapper.setFormValue("timestamp", new Date(), this.formInstance);
      this.formWrapper = new FormWrapper(
        FormWrapper.createProps(this.formInstance),
        this.deepcopy(this.formInstance)
      );
      this.formWrapper.core.mtime = now;
      this.formWrapper$.next(this.formWrapper);
    }, 400);
  }

  private deepcopy<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
  }
}
