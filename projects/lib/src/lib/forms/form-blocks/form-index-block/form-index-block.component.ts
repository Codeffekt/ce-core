import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBlock, FormInstance, FormUtils, IndexType } from '@codeffekt/ce-core-data';
import { FormChooserDialogComponent } from '../../form/form-chooser-dialog/form-chooser-dialog.component';
import { CeFormRouteResolver } from '../../form-route.resolver';
import { FormQueryIndexBuilder } from '../../forms-query/formquery-index.builder';
import { FormBlockComponent } from '../form-block/form-block.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CeFormsChangesService } from '../../../services';
import { filter, map, tap } from 'rxjs';
import { FormArrayDatasource } from '../../form-datasource';
import { CeFormDataService } from '../../form-data.service';

@UntilDestroy()
@Component({
  selector: 'ce-form-index-block',
  templateUrl: './form-index-block.component.html',
  styleUrls: ['./form-index-block.component.scss']
})
export class FormIndexBlockComponent extends FormBlockComponent<IndexType> implements OnInit {

  displayedFields: FormBlock[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formRouteResolver: CeFormRouteResolver,
    private formDataService: CeFormDataService,
    private changesService: CeFormsChangesService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.buildDisplayedFields();
  }

  openForm(formId: IndexType) {
    this.formRouteResolver.navigate(formId, this.formInstance);   
  }

  edit() {

    const query = new FormQueryIndexBuilder();

    query.setFormRoot(this.formBlock.root!);

    if (this.formBlock.value) {
      query.setExcludedIndices([this.formBlock.value]);
    }

    const dialogRef = FormChooserDialogComponent.open(this.dialog,
      {
        formBlock: this.formBlock,
        query,
        dataSource: new FormArrayDatasource(
          this.formDataService,
          this.formBlock.params?.scope === "global"
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

  private buildDisplayedFields() {

    this.displayedFields = [];

    if (!this.formBlock.root || !this.formBlock.params?.fields) {
      return;
    }

    const formField = FormUtils.getFormField(this.formBlock.field, this.formInstance);

    if (!formField) {
      return;
    }

    this.updateDisplayFields(formField);
    this.listenToFormChange(formField);
  }

  private listenToFormChange(form: FormInstance) {
    this.changesService.changes.pipe(
      untilDestroyed(this),
      map(changes => changes.find((change) => change.wrapper.core.id === form.id)),
      filter(change => change !== undefined),
      tap(change => this.updateDisplayFields(change!.wrapper.core))
    )
  }

  private updateDisplayFields(form: FormInstance) {
    this.displayedFields = this.formBlock.params.fields.map((f: string) => FormUtils.retrieveBlockFromField(form, f));
  }
}
