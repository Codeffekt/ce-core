import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountSettings, FormProjectWrapper } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { CeFormsService } from '../../services/ce-forms.service';
import { CeFormQueryService } from '../../services/ce-form-query.service';
import { ProjectsOwnedFormQueryBuilder } from './projects-owned-formquery-builder';
import { ProjectsOwnedDatasource } from './projects-owned-datasource';

@Component({
  selector: 'ce-projects-user-owned',
  templateUrl: './projects-user-owned.component.html',
  styleUrls: ['./projects-user-owned.component.scss'],
  providers: [CeFormQueryService]
})
export class ProjectsUserOwnedComponent implements OnInit {

  @Input() account!: AccountSettings;
  @Input() type = '*';
  @Output() projectSelected = new EventEmitter<FormProjectWrapper>();

  formsProject$!: Observable<readonly FormProjectWrapper[]>;

  constructor(
    private readonly formsService: CeFormsService,
    private readonly queryService: CeFormQueryService<FormProjectWrapper>,
  ) {
  }

  ngOnInit(): void {
    this.initDataSource();
  }

  onProjectSelected(project: FormProjectWrapper) {
    this.projectSelected.next(project);
  }

  private initDataSource() {
    this.queryService.setQueryBuilder(
      ProjectsOwnedFormQueryBuilder.forType(this.account, this.type)
    );
    this.queryService.setDatasource(new ProjectsOwnedDatasource(this.formsService));
    this.formsProject$ = this.queryService.connect();
    this.queryService.load();
  }
}
