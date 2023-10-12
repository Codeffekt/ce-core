import { Component, OnInit } from '@angular/core';
import { FormInstance, FormInstanceMaskWrapper, FormWrapper } from '@codeffekt/ce-core-data';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MockApiService } from '../api/mock-api.service';
import { MockFormEditorService } from './mock-form-editor.service';

@UntilDestroy()
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {

  formWrapper: FormWrapper<any>;  
  formMask: FormInstanceMaskWrapper;

  constructor(
    private apiService: MockApiService,
    private formEditorService: MockFormEditorService
  ) { }

  ngOnInit(): void {
    const formInfo = this.formEditorService.getCurrentFormInfo();
    this.formWrapper = formInfo.form;
    this.formMask = formInfo.formMask;    
    console.log(this.formMask);
  }

  async formChanges(formWrapper: FormWrapper<any>) {
    await this.apiService.updateForm(formWrapper.core);
  }

  async save(form: FormInstance) {
    this.formWrapper = await this.apiService.updateForm(form);
  }

  async saveMask(form: FormInstance) {
    this.formMask = await this.apiService.updateForm(form) as FormInstanceMaskWrapper;
  }  
}
