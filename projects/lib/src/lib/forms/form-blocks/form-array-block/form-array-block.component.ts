import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInstanceExt, FormUtils, IndexType } from '@codeffekt/ce-core-data';
import { firstValueFrom } from 'rxjs';
import { CeFormsService } from '../../../services/ce-forms.service';
import { CeFormQueryService } from '../../../services/ce-form-query.service';
import { CeFormDataService } from '../../form-data.service';
import { FormArrayDatasource } from '../../form-datasource/form-array.datasource';
import { CeFormRouteResolver } from '../../form-route.resolver';
import { FormChooserDialogComponent } from '../../form/form-chooser-dialog/form-chooser-dialog.component';
import { FormQueryArrayBuilder, isBlockAssoc } from '../../forms-query/formquery-array.builder';
import { FormQueryIndexBuilder } from '../../forms-query/formquery-index.builder';
import { FormBlockComponent } from '../form-block/form-block.component';
@Component({
  selector: 'ce-form-array-block',
  templateUrl: './form-array-block.component.html',
  styleUrls: ['./form-array-block.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class FormArrayBlockComponent extends FormBlockComponent<void> implements OnInit {

  dataSource: FormArrayDatasource;
  queryBuilder: FormQueryArrayBuilder = new FormQueryArrayBuilder();
  displayedColumns: string[] = [];
  colomnFields: string[] = [];
  isFormAssoc = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: CeFormDataService,
    private formService: CeFormsService,
    private formRouteResolver: CeFormRouteResolver,
    private readonly queryService: CeFormQueryService<FormInstanceExt>,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
    this.dataSource = new FormArrayDatasource(api);
  }

  ngOnInit(): void {
    this.buildDisplayedColumns();
    this.buildQuery();
    this.prepareQueryService();
  }

  add() {

    if (this.isFormAssoc) {
      this.addEltFromAssoc();
    } else {
      this.dataSource.createElt(this.formBlock, this.formInstance);
    }
  }

  delete(formId: IndexType) {

    if (this.isFormAssoc) {
      this.dataSource.removeEltsFromAssoc(this.formBlock, [formId], this.formInstance);
    } else {
      this.dataSource.deleteElt(this.formBlock, formId, this.formInstance);
    }
  }

  open(formId: IndexType) {
    this.formRouteResolver.resolve(this.formBlock.field, formId, this.formInstance);    
  }

  /**
   * @override
   */
  formBlockChanged(): void {
    this.isFormAssoc = isBlockAssoc(this.formBlock);
    /* this.buildDisplayedColumns();
    this.buildQuery();
    this.prepareQueryService(); */
  }

  private addEltFromAssoc() {

    const ref = this.formBlock.params?.ref || FormUtils.createFormAssocRef(this.formInstance.id, this.formBlock.field);

    const query = new FormQueryIndexBuilder();
    query.setFormRoot(this.formBlock.root);
    query.setExcludedRef(ref);

    const dialogRef = FormChooserDialogComponent.open(this.dialog,
      {
        formBlock: this.formBlock,
        query,
        dataSource: new FormArrayDatasource(
          this.api,
          this.formBlock.params?.scope === "global"
          )
      }
    );

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.dataSource.addEltsFromAssoc(ref, [form.id]);
      }
    });

  }

  private buildDisplayedColumns() {
    this.colomnFields = this.formBlock.params?.fields?.length ? this.formBlock.params.fields : ["$id", "$ctime"];
    this.displayedColumns = this.formBlock.readonly ? this.colomnFields : [...this.colomnFields, "delete"];
  }

  private buildQuery() {
    this.queryBuilder = FormQueryArrayBuilder.fromBlock(this.formBlock, this.formInstance);
  }

  private async prepareQueryService() {
    this.queryService.setDatasource(this.dataSource);
    this.queryService.setQueryBuilder(this.queryBuilder);
    const formRoot = await firstValueFrom(this.formService.getFormRoot(this.formBlock.root));
    this.queryService.setModel(formRoot);
  }
}
