import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormInstance, FormInstanceMaskWrapper, FormWrapper } from '@codeffekt/ce-core-data';
import { MockApiService } from '../../api/mock-api.service';
import { CommonModule } from '@angular/common';
import { CeCodeEditorComponent } from '@codeffekt/ce-code-editor';
import { CeFormComponent } from '@codeffekt/ce-core';

@Component({
    selector: 'app-forms-mask',
    templateUrl: './forms-mask.component.html',
    styleUrls: ['./forms-mask.component.scss'],
    imports: [
      CommonModule,
      CeCodeEditorComponent,
      CeFormComponent,
    ]
})
export class FormsMaskComponent implements OnInit {

  formWrapper!: FormWrapper<any>;
  mask!: FormInstanceMaskWrapper;

  constructor(
    private apiService: MockApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.formWrapper = data.form;
      this.mask = data.mask;
    });
  }

  async formChanges(formWrapper: FormWrapper<any>) {
    await this.apiService.updateForm(formWrapper.core);
  }

  async save(form: FormInstance) {
    this.formWrapper = await this.apiService.updateForm(form);
  }

  async updateMask(form: FormInstance) {    
    this.mask = new FormInstanceMaskWrapper(form);
  }
}
