import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FormInfo } from '../models/form-info';
import { CeFormEditorService } from '../services/ce-form-editor.service';
import { CeProjectsService } from '../services/ce-projects.service';

@Injectable({ providedIn: 'root' })
export class FormProjectResolverService  {
    constructor(
        private projectService: CeProjectsService,
        private formEditorService: CeFormEditorService,
        private router: Router) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormInfo> {
        const id = route.paramMap.get('project');

        if(!id) {
            throw new Error(`No project route param`);
        }

        const project = await this.projectService.getProject(id);
        if (project && project.core.id) {
            const form = await this.formEditorService.getForm(id);
            return form;
        } else { // id not found
            this.router.navigate(['/']);
            return null as any;
        }
    }
}
