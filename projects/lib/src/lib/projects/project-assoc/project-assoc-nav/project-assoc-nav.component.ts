import { Component, OnInit } from '@angular/core';
import { FormInstance, FormWrapper, IndexType } from '@codeffekt/ce-core-data';
import { CeProjectsService } from '../../../services/ce-projects.service';
import { CeCoreService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lib-project-assoc-nav',
  templateUrl: './project-assoc-nav.component.html',
  styleUrls: ['./project-assoc-nav.component.scss']
})
export class ProjectAssocNavComponent implements OnInit {

  pid: IndexType;
  formWrapper!: FormWrapper;

  constructor(
    projectsService: CeProjectsService,    
    private coreService: CeCoreService,
    private route: ActivatedRoute,   
    private router: Router,
  ) {
    this.pid = projectsService.getCurrentProjectId();
  }

  ngOnInit(): void {    
  }

  async createElement() {
    const newElt = await firstValueFrom(this.coreService.callFormMutation(this.pid, {
      type: 'form',
      op: 'create',
      rootField: this.formWrapper.props.assoc.field
    }));
    this.goForm(newElt);
  }

  goForm(form: FormInstance) {
    this.router.navigate([form.id], { relativeTo: this.route });
  }
}
