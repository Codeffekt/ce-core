import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBlock, FormInstance, FormRoot, FormUtils, IndexType } from '@codeffekt/ce-core-data';
import { FormChooserDialogComponent } from '../../form/form-chooser-dialog/form-chooser-dialog.component';
import { CeFormRouteResolver } from '../../form-route.resolver';
import { FormBlockComponent } from '../form-block/form-block.component';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CeFormsService } from '../../../services';
import { firstValueFrom } from 'rxjs';
import { FormsRootInstanceDataSource } from '../../form-datasource';
import { FormQueryRootBuilder } from '../../forms-query';

@UntilDestroy()
@Component({
  selector: 'ce-form-root-block',
  templateUrl: './form-root-block.component.html',
  styleUrls: ['./form-root-block.component.scss']
})
export class FormRootBlockComponent extends FormBlockComponent<IndexType> implements OnInit {

  displayedFields: FormBlock[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formRouteResolver: CeFormRouteResolver,
    private formsService: CeFormsService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.buildDisplayedFields();
  }

  openForm(formId: IndexType) {
    this.formRouteResolver.resolve(this.formBlock.field, formId, this.formInstance);    
  }

  edit() {

    const query = new FormQueryRootBuilder();    

    if (this.formBlock.value) {
      query.setExcludedIndices([this.formBlock.value]);
    }

    const dialogRef = FormChooserDialogComponent.open(this.dialog,
      {
        formBlock: this.formBlock,
        query,
        dataSource: new FormsRootInstanceDataSource(
          this.formsService
          )
      }
    );

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.value = form.id;
        this.formInstance.fields = {
          ...this.formInstance.fields,
          [this.formBlock.field]: form
        };
        this.buildDisplayedFields();
      }
    });
  }

  delete() {
    // event.stopPropagation();
    this.value = undefined as any;
    this.formInstance.fields = {
      ...this.formInstance.fields,
      [this.formBlock.field]: undefined as any
    };
    this.buildDisplayedFields();
  }

  private async buildDisplayedFields() {

    this.displayedFields = [];

    if (!this.formBlock.value || !this.formBlock.params?.fields) {
      return;
    }    

    const formRoot = await firstValueFrom(this.formsService.getFormRoot(this.formBlock.value));

    this.updateDisplayFields(formRoot);    
  }  

  private updateDisplayFields(form: FormRoot) {
    this.displayedFields = this.formBlock.params.fields
      .map((f: string) => FormUtils.retrieveBlockFromField(form, f))
      .filter((f: string) => f !== undefined);
  }
}
