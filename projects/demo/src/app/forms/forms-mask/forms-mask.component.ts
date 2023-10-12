import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormInstance, FormInstanceMaskWrapper, FormWrapper } from '@codeffekt/ce-core-data';
import { MockApiService } from '../../api/mock-api.service';

@Component({
  selector: 'app-forms-mask',
  templateUrl: './forms-mask.component.html',
  styleUrls: ['./forms-mask.component.scss']
})
export class FormsMaskComponent implements OnInit {

  formWrapper: FormWrapper<any>;
  mask: FormInstanceMaskWrapper;

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
