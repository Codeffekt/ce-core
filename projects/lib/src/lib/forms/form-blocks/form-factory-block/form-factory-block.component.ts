import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormBlockFieldComponent } from '../form-block-field/form-block-field.component';
import { FormBlockFieldActionsComponent } from '../form-block-field/form-block-field-actions/form-block-field-actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { FormsRootDataSource } from '../../form-datasource';
import { CeFormsService } from '../../../services';
import { RootChooserDialogComponent } from '../../../roots/root-chooser-dialog';
import { FormsFormQueryBuilder } from '../../forms-query';
import { FormBlockFieldContentComponent } from '../form-block-field/form-block-field-content/form-block-field-content.component';
import { CeLayoutModule } from '../../../layout';

@Component({
  selector: 'lib-form-factory-block',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,  
    CeLayoutModule,
    FormBlockFieldComponent,
    FormBlockFieldActionsComponent,
    FormBlockFieldContentComponent,
    RootChooserDialogComponent,
  ],
  templateUrl: './form-factory-block.component.html',
  styleUrls: ['./form-factory-block.component.scss']
})
export class FormFactoryBlockComponent extends FormBlockComponent {

  private dialog = inject(MatDialog);
  private formsService = inject(CeFormsService);

  selectRoot() {

    const dialogRef = RootChooserDialogComponent.open(this.dialog,
      {
        dataSource: new FormsRootDataSource(
          this.formsService
        ),
        query: new FormsFormQueryBuilder(),
      }
    );

    dialogRef.afterClosed().pipe(
      filter(form => form !== undefined)
    ).subscribe(form => {
      this.value = form.id;
    });

  }

  async createInstance() {

    const updatedForm = await this.formsService.rawFormMutation({
      type: 'factory',
      op: 'create',
      indices: [this.formInstance.id],
      formEltField: this.formBlock.field
    });

    console.log(updatedForm);

  }

}
