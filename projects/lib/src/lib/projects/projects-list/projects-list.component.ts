import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSettings, FormProjectWrapper } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { CeAppConfig } from '../../ce-core.config';
import { ProjectsDataSource } from '../../forms/form-datasource';
import { ProjectsQueryBuilder } from '../../forms/forms-query/projects-query.builder';
import { CeAppService, CeCoreService, CeFormsService } from '../../services';
import { CeFormQueryService } from '../../services/ce-form-query.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class CeProjectsListComponent implements OnInit {

  projectsDataSource!: ProjectsDataSource;
  projects$!: Observable<readonly FormProjectWrapper[]>;
  account!: AccountSettings;

  appConfig!: CeAppConfig;

  constructor(
    private readonly queryService: CeFormQueryService<FormProjectWrapper>,
    appService: CeAppService,
    formsService: CeFormsService,
    private coreService: CeCoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.appConfig = appService.getConfig();
    this.account = this.coreService.getCurrentUser().settings;
    this.projectsDataSource = new ProjectsDataSource(formsService);
    const projectType = appService.getProjectType();
    this.queryService.setQueryBuilder(
      ProjectsQueryBuilder.fromCurrentUser(this.account, projectType)
    );
    this.queryService.setDatasource(this.projectsDataSource);    
  }

  ngOnInit() {
    this.observeDataSource();
  }

  goProject(project: FormProjectWrapper) {

    const formBlocks = project.getFormsBlocks();

    if (!formBlocks.length) {
      return;
    }

    const assocId = this.appConfig.defaultAssocIdRoute ?? formBlocks[0].field;
    this.router.navigate(["../project", project.core.id, assocId], { relativeTo: this.route });
  }

  private observeDataSource() {
    this.projects$ = this.queryService.connect();
    this.queryService.load();
  }

}
