import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBlock, FormInstance, FormUtils, IndexType } from '@codeffekt/ce-core-data';
import { FormChooserDialogComponent } from '../../form/form-chooser-dialog/form-chooser-dialog.component';
import { CeFormRouteResolver } from '../../form-route.resolver';
import { FormQueryIndexBuilder } from '../../forms-query/formquery-index.builder';
import { FormBlockComponent } from '../form-block/form-block.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CeFormsChangesService, CeFormsService, LayoutService } from '../../../services';
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
    public dialog: MatDialog,
    private formRouteResolver: CeFormRouteResolver,
    private formDataService: CeFormDataService,
    private changesService: CeFormsChangesService,
    private layout: LayoutService,
    private formsService: CeFormsService,
  ) {
    super();
  }

  ngOnInit() {
    this.buildDisplayedFields();
  }

  openForm(formId: IndexType) {
    this.formRouteResolver.navigate(formId, this.formInstance);
  }

  async onCreate() {
    if(!this.formBlock.root) {
      return;
    }

    try {
      const newForm = await this.formsService.createForm(this.formBlock.root);
      this.value = newForm.id;
      this.layout.showSingleMessage(`Le formulaire à été créé.`);
      this.buildDisplayedFields();
  } catch(err) {
      this.layout.showErrorMessage(`Erreur lors de la création d'un nouveau formulaire`);
  }
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

    if (!this.formBlock.root) {
      return;
    }

    const formField = FormUtils.getFormField(this.formBlock.field, this.formInstance);

    if (!formField) {
      return;
    }

    this.updateDisplayFields(this.formBlock, formField);
    this.listenToFormChange(formField);
  }

  private listenToFormChange(form: FormInstance) {
    // TODO: the subscription is not cancelled after edit !
    this.changesService.changes.pipe(
      untilDestroyed(this),
      map(changes => changes.find((change) => change.wrapper.core.id === form.id)),
      filter(change => change !== undefined),
      tap(change => this.updateDisplayFields(this.formBlock, change!.wrapper.core))
    )
  }

  private updateDisplayFields(block: FormBlock, form: FormInstance) {
    const fields = block.params?.fields?.length ? block.params.fields : form.params?.fields;
    this.displayedFields = fields ? fields.map((f: string) => FormUtils.retrieveBlockFromField(form, f)) : [];    
  }
}
