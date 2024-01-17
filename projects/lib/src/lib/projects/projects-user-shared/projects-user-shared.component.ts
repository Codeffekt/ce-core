import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountSettings, FormProjectWrapper } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { CeFormQueryService } from '../../services/ce-form-query.service';
import { ProjectsSharedFormQueryBuilder } from './projects-shared-formquery-builder';
import { ProjectsSharedDatasource } from './projects-shared-datasource';
import { CeFormsService } from '../../services/ce-forms.service';

@Component({
  selector: 'ce-projects-user-shared',
  templateUrl: './projects-user-shared.component.html',
  styleUrls: ['./projects-user-shared.component.scss'],
  providers: [CeFormQueryService]
})
export class ProjectsUserSharedComponent implements OnInit {

  @Input() account!: AccountSettings;
  @Input() type = '*';
  @Output() projectSelected = new EventEmitter<FormProjectWrapper>();

  formsProject$!: Observable<readonly FormProjectWrapper[]>;

  constructor(
    private readonly formsService: CeFormsService,
    private readonly queryService: CeFormQueryService<FormProjectWrapper>,  
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  onProjectSelected(project: FormProjectWrapper) {
    this.projectSelected.next(project);
  }

  private initDataSource() {
    this.queryService.setQueryBuilder(
      ProjectsSharedFormQueryBuilder.forType(this.account, this.type)
    );
    this.queryService.setDatasource(new ProjectsSharedDatasource(this.formsService));
    this.formsProject$ = this.queryService.connect(); 
    this.queryService.load();
  }

}
