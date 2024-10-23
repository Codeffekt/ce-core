import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormBlockFieldComponent } from '../form-block-field/form-block-field.component';
import { FormBlockFieldActionsComponent } from '../form-block-field/form-block-field-actions/form-block-field-actions.component';
import { CeLayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CeProcessingService } from '../../../services/ce-processing.service';
import { SpaceFormPathService } from '../../../spaces';
import { FormBlockFieldContentComponent } from "../form-block-field/form-block-field-content/form-block-field-content.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormInstance, FormWrapper } from '@codeffekt/ce-core-data';

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
    FormBlockFieldComponent,
    FormBlockFieldActionsComponent,
    FormBlockFieldContentComponent
],
  templateUrl: './form-action-block.component.html',
  styleUrls: ['./form-action-block.component.scss']
})
export class FormActionBlockComponent extends FormBlockComponent implements OnInit {

  private actionService = inject(CeProcessingService);
  private spacePathService = inject(SpaceFormPathService);

  readonly status = signal("PENDING");
  readonly messages: WritableSignal<string[]> = signal([]);

  ngOnInit(): void {
      this.updateStatusAndMessagesFromForm(this.formInstance);
  }

  async startAction() {
    try {
      this.status.set("PENDING");
      this.pushMessage("Starting action...");      
      await this.actionService.start(this.formInstance.id);
      this.actionService.listen(this.formInstance.id).subscribe(newForm => {
        this.updateStatusAndMessagesFromForm(newForm.form.core);                
        this.spacePathService.setCurrentForm(newForm);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async cancelAction() {
    try {
      this.status.set("PENDING");
      this.pushMessage("Canceling action...");
      await this.actionService.cancel(this.formInstance.id);
    } catch (err) {
      console.log(err);
    }
  }

  private updateStatusAndMessagesFromForm(form: FormInstance) {
    this.status.set(FormWrapper.getFormValue('status', form));
    this.pushMessage(FormWrapper.getFormValue('message', form));
  }  

  private pushMessage(msg: string) {
    this.messages.update((prev) => [...prev, `[${this.status()}] ${msg}`]);
  }
}
