import { Injectable } from '@angular/core';
import {
  FormInstanceMaskWrapper,
  FormProject, FormProjectWrapper,
  IndexType} from '@codeffekt/ce-core-data';
import { firstValueFrom } from 'rxjs';
import { FormMaskBuilder } from '../forms/form/form-mask.builder';
import { CeAppService } from './ce-app.service';
import { CeCoreService } from './ce-core.service';
import { CeFormsService } from './ce-forms.service';

/**
 * Service that wraps ce-core api to manage
 * information about projects
 * Use this service to manage the current project.
 * Please, use the project in form masked format asap
 * using {@link getCurrentProjectFormMasked}
 */
@Injectable({
  providedIn: 'root'
})
export class CeProjectsService {

  private project!: FormProjectWrapper;  
  private projectMask: FormInstanceMaskWrapper | undefined;
  private projectFormMasked: FormProjectWrapper | undefined;

  constructor(
    private coreService: CeCoreService,
    private formsService: CeFormsService,
    private readonly appService: CeAppService,
  ) { }
  
  getCurrentProject(): FormProjectWrapper {
    return this.project;
  }

  /**
   * Returns the current project id
   * @returns the project unique id
   */
  getCurrentProjectId(): IndexType {
    return this.project.core.id;
  }  

  getCurrentProjectFormMasked(): FormProjectWrapper | undefined {
    return this.projectFormMasked;
  }

  getCurrentProjectMask(): FormInstanceMaskWrapper | undefined {
    return this.projectMask;
  }

  getCurrentProjectAssetsRef(): IndexType {    
    return this.project.getAssetsRef();
  }

  setCurrentProject(project: FormProjectWrapper) {
    this.project = project;    
    this.projectMask = this.appService.getMasks()
      .find(mask => mask.props.root === FormProject.ROOT);

    if (this.projectMask) {
      const formProjectInstance = new FormMaskBuilder()
        .build(this.project.core, this.projectMask);
      this.projectFormMasked = new FormProjectWrapper(formProjectInstance);
    } else {
      this.projectFormMasked = this.project;
    }

  }

  async getProject(id: IndexType): Promise<FormProjectWrapper> {
    if (this.project && this.project.core.id === id) {
      return this.project;
    } else {
      const form = await this.formsService.getForm(id);
      const project = new FormProjectWrapper(form);
      this.setCurrentProject(project);
      return project;      
    }
  }

  remove(pid: IndexType): Promise<boolean> {
    return firstValueFrom(this.coreService.callProject("removeProject", pid));
  }

}
