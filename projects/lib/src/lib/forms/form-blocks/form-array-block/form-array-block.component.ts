import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBlockArray, FormInstanceBase, FormInstanceExt, FormUtils, IndexType } from '@codeffekt/ce-core-data';
import { firstValueFrom } from 'rxjs';
import { CeFormsService } from '../../../services/ce-forms.service';
import { CeFormQueryService } from '../../../services/ce-form-query.service';
import { CeFormDataService } from '../../form-data.service';
import { FormArrayDatasource } from '../../form-datasource/form-array.datasource';
import { CeFormRouteResolver } from '../../form-route.resolver';
import { FormChooserDialogComponent } from '../../form/form-chooser-dialog/form-chooser-dialog.component';
import { FormQueryArrayBuilder } from '../../forms-query/formquery-array.builder';
import { FormQueryIndexBuilder } from '../../forms-query/formquery-index.builder';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormQueryBuilder } from '../../forms-query/formquery.builder';
import { RootChooserDialogComponent } from '../../../roots/root-chooser-dialog';
import { FormsRootDataSource } from '../../form-datasource/forms-root-datasource';
@Component({
  selector: 'ce-form-array-block',
  templateUrl: './form-array-block.component.html',
  styleUrls: ['./form-array-block.component.scss'],
  providers: [
    CeFormQueryService
  ],
  standalone: false
})
export class FormArrayBlockComponent extends FormBlockComponent<FormBlockArray> implements OnInit {

  dataSource: FormArrayDatasource;
  queryBuilder: FormQueryArrayBuilder = new FormQueryArrayBuilder();
  displayedColumns: string[] = [];
  colomnFields: string[] = [];
  isFormAssoc = false;
  private formRoot!: FormInstanceBase;

  constructor(
    public dialog: MatDialog,
    private api: CeFormDataService,
    private formsService: CeFormsService,
    private formRouteResolver: CeFormRouteResolver,
    private readonly queryService: CeFormQueryService<FormInstanceExt>,
  ) {
    super();
    this.dataSource = new FormArrayDatasource(api);
  }

  ngOnInit(): void {
    this.init();
  }

  async onAdd() {

    const block = await this.selectBlockFromCat(this.formBlock) ?? this.formBlock;

    if (!block) {
      return;
    }

    this.dataSource.createElt(this.formBlock, this.formInstance);

  }

  onLink() {

    if(!this.formBlock.root) {
      return;
    }

    const ref = this.formBlock.params?.ref || FormUtils.createFormAssocRef(this.formInstance.id, this.formBlock.field);

    const query = new FormQueryIndexBuilder();

    if(this.formBlock.params?.useCategory) {
      query.setCat(this.formBlock.root);
    } else {
      query.setFormRoot(this.formBlock.root);
    }
    
    query.setExcludedRef(ref);

    const dialogRef = FormChooserDialogComponent.open(this.dialog,
      {
        formBlock: this.formBlock,
        query,
        dataSource: new FormArrayDatasource(
          this.api,
        )
      }
    );

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.dataSource.addEltsFromAssoc(ref, [form.id]);
      }
    });

  }

  onDelete(formId: IndexType) {
    this.dataSource.deleteElt(this.formBlock, formId, this.formInstance);
  }

  onUnlink(formId: IndexType) {
    this.dataSource.removeEltsFromAssoc(this.formBlock, [formId], this.formInstance);
  }

  open(formId: IndexType) {
    this.formRouteResolver.navigate(formId, this.formInstance);
  }

  formBlockChanged(): void {
  }

  private async init() {
    await this.prepareQueryService();
    this.buildDisplayedColumns();
  }

  private buildDisplayedColumns() {
    const fields: string[] | undefined = this.formBlock.params?.fields?.length ? this.formBlock.params.fields : this.formRoot.params?.fields;
    this.colomnFields = fields?.length ? fields : ["$id", "$ctime"];
    this.displayedColumns = this.formBlock.readonly ? this.colomnFields : [...this.colomnFields, "actions"];
  }

  private async prepareQueryService() {
    this.queryBuilder = FormQueryArrayBuilder.fromBlock(this.formBlock, this.formInstance);
    this.queryService.setDatasource(this.dataSource);
    this.queryService.setQueryBuilder(this.queryBuilder);
    this.formRoot = await firstValueFrom(this.formsService.getFormRoot(this.formBlock.root!));
    this.queryService.setModel(this.formRoot);
  }

  private async selectBlockFromCat(block: FormBlockArray): Promise<FormBlockArray | undefined> {

    if (!block.params?.useCategory || !block.root) {
      return undefined;
    }

    const query = new FormQueryBuilder();
    query.setCat(block.root);

    const dialogRef = RootChooserDialogComponent.open(this.dialog,
      {
        dataSource: new FormsRootDataSource(
          this.formsService
        ),
        query,
      }
    );

    const root: IndexType | undefined = await firstValueFrom(dialogRef.afterClosed());

    return root !== undefined ? {
      ...block,
      root,
    } : undefined;
  }
}
