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

@UntilDestroy()
@Component({
  selector: 'lib-form-action-block',
  standalone: true,
  imports: [
    CommonModule,
    CeLayoutModule,
    MatIconModule,
    MatButtonModule,    
    FormBlockFieldComponent,
    FormBlockFieldActionsComponent,    
  ],
  templateUrl: './form-action-block.component.html',
  styleUrls: ['./form-action-block.component.scss']
})
export class FormActionBlockComponent extends FormBlockComponent {

  private actionService = inject(CeProcessingService);

  startAction() {    
    this.actionService.start(this.formInstance.id);
  }

  cancelAction() {    
    this.actionService.cancel(this.formInstance.id);
  }
}
