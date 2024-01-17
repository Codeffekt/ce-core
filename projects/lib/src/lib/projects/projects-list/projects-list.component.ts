import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSettings, FormProjectWrapper } from '@codeffekt/ce-core-data';
import { CeAppConfig } from '../../ce-core.config';
import { CeAppService, CeCoreService } from '../../services';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class CeProjectsListComponent implements OnInit {

  account!: AccountSettings;
  projectType!: string;
  appConfig!: CeAppConfig;

  constructor(
    appService: CeAppService,
    private coreService: CeCoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.appConfig = appService.getConfig();
    this.account = this.coreService.getCurrentUser().settings;
    this.projectType = appService.getProjectType();
  }

  ngOnInit() {
  }

  goProject(project: FormProjectWrapper) {

    const formBlocks = project.getFormsBlocks();

    if (!formBlocks.length) {
      return;
    }

    const assocId = this.appConfig.defaultAssocIdRoute ?? formBlocks[0].field;
    this.router.navigate(["../project", project.core.id, assocId], { relativeTo: this.route });
  }

}
