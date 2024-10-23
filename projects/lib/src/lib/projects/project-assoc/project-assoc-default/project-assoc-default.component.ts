import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBlock, FormWrapper } from '@codeffekt/ce-core-data';
import { firstValueFrom, Observable } from 'rxjs';
import {
  CeAccountService, CeAppService,
  CeCoreService, CeFormQueryService,
  CeFormsService, CeProjectsService
} from '../../../services';
import { CeProjectAssocDatasource } from '../project-assoc-datasource';
import { CeProjectAssocFormQueryBuilder } from '../project-assoc-formquery-builder';
import { IProjectAssocContent } from '../project-assoc-models';
import { FormQueryArrayBuilder } from '../../../forms/forms-query';

@Component({
  selector: 'lib-project-assoc-default',
  templateUrl: './project-assoc-default.component.html',
  styleUrls: ['./project-assoc-default.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class ProjectAssocDefaultComponent implements OnInit, IProjectAssocContent {

  forms$!: Observable<readonly FormWrapper[]>;
  block!: FormBlock;

  private datasource: CeProjectAssocDatasource;
  private formQueryBuilder!: FormQueryArrayBuilder;

  constructor(
    private route: ActivatedRoute,
    private queryService: CeFormQueryService<FormWrapper>,
    private projectsService: CeProjectsService,
    protected appService: CeAppService,
    coreService: CeCoreService,
    accountsService: CeAccountService,
    private formsService: CeFormsService,
    private router: Router,
  ) {
    this.datasource = new CeProjectAssocDatasource(coreService);
    this.datasource.pid = projectsService.getCurrentProjectId();
    this.datasource.members = accountsService.getCurrentMembers();
  }

  ngOnInit(): void {
    this.datasource.assoc = this.block;
    this.datasource.mask = this.appService.getMask(this.block.root!);
    this.prepareQueryService();
  }

  goForm(form: FormWrapper) {
    this.router.navigate([form.core.id], { relativeTo: this.route });
  }

  onItemChanged() {
    this.queryService.load();
  }

  private async prepareQueryService() {
    this.formQueryBuilder = FormQueryArrayBuilder.fromBlock(this.block, this.projectsService.getCurrentProject().core);
    this.queryService.setQueryBuilder(this.formQueryBuilder);
    this.queryService.setDatasource(this.datasource);
    const formRoot = await firstValueFrom(this.formsService.getFormRoot(this.block.root!));
    if (!formRoot?.id) {
      throw new Error(`Form root ${this.block.root} not found.`);
    }
    this.queryService.setModel(formRoot);
    this.forms$ = this.queryService.connect();
  }
}
