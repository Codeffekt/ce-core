import { Component } from '@angular/core';
import { FormBlockSelectOption } from '@codeffekt/ce-core-data';
import { CeFormsParamsService } from '../../../services/ce-forms-params.service';
import { FormBlockComponent } from '../form-block/form-block.component';

@Component({
  selector: 'ce-form-select-block',
  templateUrl: './form-select-block.component.html',
  styleUrls: ['./form-select-block.component.scss']
})
export class FormSelectBlockComponent extends FormBlockComponent<string> {

  useFormsParams = false;

  formsParamsOptions!: FormBlockSelectOption[];

  constructor(private formsParams: CeFormsParamsService) {
    super();
  }

  ngOnInit() {
    if(this.formBlock.params?.useFormsParams) {
      this.formsParamsOptions = this.formsParams.getParamsFromId(this.formBlock.params.formsParamsId);
      this.useFormsParams = true;
    }
  }
}
