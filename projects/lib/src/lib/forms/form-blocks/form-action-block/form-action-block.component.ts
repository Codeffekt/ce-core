import { Component, inject } from '@angular/core';
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
import { FormWrapper } from '@codeffekt/ce-core-data';
import { FormActionPipesModule } from './form-action-pipes.module';
import { filter, map, scan, share } from 'rxjs';

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
export class FormActionBlockComponent extends FormBlockComponent {

  private actionService = inject(CeProcessingService);
  private spacePathService = inject(SpaceFormPathService);

  currentForm$ = this.spacePathService.onCurrentForm().pipe(
    share()
  );

  status$ = this.currentForm$.pipe(
    map(formInfo => FormWrapper.getFormValue('status', formInfo!.form.core))
  )

  messages$ = this.currentForm$.pipe(
    filter(formInfo => this.actionService.isRunning(
      FormWrapper.getFormValue('status', formInfo!.form.core))
    ),
    map(formInfo => FormWrapper.getFormValue('message', formInfo!.form.core)),
    scan((acc, cur) => `${acc}\n${cur}`),
  )

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
