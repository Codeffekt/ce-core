import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CeFormRouteResolver } from '../../form-route.resolver';
import { CeFormDataService } from '../../form-data.service';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormAssocDatasource } from '../../form-datasource/form-assoc.datasource';
import { FormInstanceExt, FormUtils, IndexType } from '@codeffekt/ce-core-data';
import { FormQueryAssocBuilder } from '../../forms-query/formquery-assoc.builder';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { FormQueryIndexBuilder } from '../../forms-query/formquery-index.builder';
import { CeFormQueryService } from '../../../services/ce-form-query.service';
import { CeFormsService } from '../../../services';
import { firstValueFrom } from 'rxjs';
import { FormChooserDialogComponent } from '../../form/form-chooser-dialog/form-chooser-dialog.component';
import { FormArrayDatasource } from '../../form-datasource';

@Component({
  selector: 'lib-form-assoc-block',
  templateUrl: './form-assoc-block.component.html',
  styleUrls: ['./form-assoc-block.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class FormAssocBlockComponent extends FormBlockComponent<void> implements OnInit {

  dataSource: FormAssocDatasource;
  queryBuilder: FormQueryAssocBuilder = new FormQueryAssocBuilder();
  displayedColumns: string[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: CeFormDataService,
    private formRouteResolver: CeFormRouteResolver,
    private formService: CeFormsService,
    private readonly queryService: CeFormQueryService<FormInstanceExt>,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
    this.dataSource = new FormAssocDatasource(api);
  }

  ngOnInit(): void {
    this.buildDisplayedColumns();
    this.dataSource.useProject = !(this.formBlock.params?.scope === 'global');
    this.queryBuilder.setAssoc(this.formBlock, this.formInstance);
    this.prepareQueryService();
  }

  add() {

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
        this.dataSource.addElts(ref, [form.id]);
      }
    });

  }

  create() {
    this.dataSource.createElt(this.formBlock.root);
  }

  remove(id: IndexType) {
    const ref = this.formBlock.params?.ref || FormUtils.createFormAssocRef(this.formInstance.id, this.formBlock.field);
    this.dataSource.removeElts(ref, [id]);
  }

  delete(id: IndexType) {
    this.dataSource.deleteElts([id]);
  }

  open(formId: IndexType) {
    const routeParams = this.formRouteResolver.resolve(this.formBlock.field, formId, this.formInstance);
    this.router.navigate(routeParams.route, { relativeTo: routeParams.isRelativeRoute ? this.activatedRoute : null });
  }

  private buildDisplayedColumns() {
    if (this.formBlock.params && this.formBlock.params.fields) {
      this.displayedColumns = [...this.formBlock.params?.fields, 'delete'];
    }
  }

  private async prepareQueryService() {
    this.queryService.setDatasource(this.dataSource);
    this.queryService.setQueryBuilder(this.queryBuilder);
    const formRoot = await firstValueFrom(this.formService.getFormRoot(this.formBlock.root));
    this.queryService.setModel(formRoot);
  }
}
