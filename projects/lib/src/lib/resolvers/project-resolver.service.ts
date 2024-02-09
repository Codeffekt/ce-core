import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { FormProjectWrapper } from '@codeffekt/ce-core-data';
import { CeProjectsService } from '../services/ce-projects.service';

@Injectable({ providedIn: 'root' })
export class ProjectResolverService implements Resolve<FormProjectWrapper> {
  constructor(
    private projectService: CeProjectsService,
    private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormProjectWrapper> {
    const id = route.paramMap.get('form');
    const project = await this.projectService.getProject(id);
    if (project && project.core.id) {
      return project;
    } else { // id not found
      this.router.navigate(['/']);
      return null;
    }
  }
}
