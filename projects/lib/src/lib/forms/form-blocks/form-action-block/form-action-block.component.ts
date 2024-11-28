import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormBlockFieldComponent } from '../form-block-field/form-block-field.component';
import { FormBlockFieldActionsComponent } from '../form-block-field/form-block-field-actions/form-block-field-actions.component';
import { CeLayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CeProcessingService } from '../../../services/ce-processing.service';
import { FormBlockFieldContentComponent } from "../form-block-field/form-block-field-content/form-block-field-content.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { FormActionPipesModule } from './form-action-pipes.module';

@UntilDestroy()
@Component({
  selector: 'lib-form-action-block',
  standalone: true,
  imports: [
    CommonModule,
    CeLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    FormActionPipesModule,
    FormBlockFieldComponent,
    FormBlockFieldActionsComponent,
    FormBlockFieldContentComponent,
  ],
  templateUrl: './form-action-block.component.html',
  styleUrls: ['./form-action-block.component.scss']
})
export class FormActionBlockComponent extends FormBlockComponent implements OnInit {

  private actionService = inject(CeProcessingService);

  status: string = "";
  messages: string = "";  

  ngOnInit(): void {
      this.status = FormWrapper.getFormValue("status", this.formInstance);
      this.messages = FormWrapper.getFormValue("message", this.formInstance);
  }

  async startAction() {
    try {
      await this.actionService.start(this.formInstance.id);
    } catch (err) {
      console.log(err);
    }
  }

  async cancelAction() {
    try {
      await this.actionService.cancel(this.formInstance.id);
    } catch (err) {
      console.log(err);
    }
  }

}
