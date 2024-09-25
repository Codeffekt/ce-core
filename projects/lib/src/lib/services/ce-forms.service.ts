import { Injectable } from '@angular/core';
import {
  DbArrayRes, FormArray,
  FormInstance, FormInstanceExt, FormMutate, FormQuery, FormRoot, IndexType
} from '@codeffekt/ce-core-data';
import { firstValueFrom, Observable } from 'rxjs';
import { CeCoreService } from './ce-core.service';

@Injectable({
  providedIn: 'root'
})
export class CeFormsService {

  constructor(private coreService: CeCoreService) { }

  createForm(root: IndexType, partialContent?: Partial<any>): Promise<FormInstance> {
    return firstValueFrom(this.coreService.callForms("create", root, partialContent));
  }

  createFormFromTemplate(template: IndexType, partialContent?: any): Promise<FormInstance> {
    return firstValueFrom(this.coreService.callForms("createFromTemplate", template, partialContent));
  }

  copyForm(src: IndexType): Promise<FormInstance> {
    return firstValueFrom(this.coreService.callForms("copy", src));
  }

  getForm(fid: IndexType): Promise<FormInstance> {
    return firstValueFrom(this.coreService.callForms("get", fid));
  }

  deleteForm(fid: IndexType): Promise<boolean> {
    return firstValueFrom(this.coreService.callForms("deleteForm", fid));
  }

  deleteFormRoot(fid: IndexType): Promise<boolean> {
    return firstValueFrom(this.coreService.callForms("deleteFormRoot", fid));
  }

  getFormsFromArray(formArray: FormArray): Promise<FormInstance[]> {
    return firstValueFrom(this.coreService.callForms("getFormsFromArray", formArray));
  }

  getFormQuery(pid: IndexType, id: IndexType, creator: IndexType, query: FormQuery): Promise<FormInstance | FormInstanceExt> {
    return firstValueFrom(this.coreService.callProject("getFormQuery", pid, id, creator, query));
  }

  getFormsQuery(pid: IndexType, creator: IndexType, query: FormQuery): Promise<DbArrayRes<FormInstanceExt>> {
    return firstValueFrom(this.coreService.callProject("getFormsQuery", pid, creator, query));
  }

  updateForm(formInstance: FormInstance): Promise<FormInstance> {
    return firstValueFrom(this.coreService.callForms("update", formInstance));
  }

  updateForms(formInstances: FormInstance[]): Promise<boolean> {
    return firstValueFrom(this.coreService.callForms('updateForms', formInstances));
  }

  getFormRoot(fid: IndexType): Observable<any> {
    return this.coreService.callForms("getRoot", fid);
  }

  updateFormRoot(formRoot: FormRoot): Promise<FormInstance> {
    return firstValueFrom(this.coreService.callForms("updateRoot", formRoot));
  }

  formsQuery(pid: IndexType, query: FormQuery) {
    return this.coreService.callFormsQuery(pid, query);
  }

  formQuery(pid: IndexType, id: IndexType, query: FormQuery) {
    return this.coreService.callFormQuery(pid, id, query);
  }

  formMutation(pid: IndexType, mutation: FormMutate) {
    return firstValueFrom(this.coreService.callProject("formMutation", pid, mutation));
  }

  formUpgrade(root: IndexType, indices: IndexType[]) {
    return firstValueFrom(this.coreService.callForms("formMutation", {
      indices,
      type: "form",
      op: "upgrade",
      root
    } as FormMutate));
  }

  removeRoot(id: IndexType): Promise<boolean> {
    return firstValueFrom(this.coreService.callForms("deleteFormRoot", id));
  }

  getRawFormsRootQuery(query: FormQuery): Observable<DbArrayRes<FormRoot>> {
    return this.coreService.callFormsRoot("getFormsQuery", query);
  }

  getRawFormsQuery(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
    return this.coreService.callForms("getFormsQuery", query);
  }

  getFormWithDeps(root: IndexType): Observable<DbArrayRes<FormRoot>> {
    return this.coreService.callFormsRoot('getFormWithDeps', root);
  }

  /**
   * Retrieve a single form using a form query by calling the
   * form db directly
   * @param id the form id
   * @param query 
   * @returns 
   */
  getRawFormQuery(id: IndexType, query?: FormQuery): Observable<FormInstance | FormInstanceExt> {
    return this.coreService.callForms("getFormQuery", id, query);
  }

  rawFormMutation<T = any>(query: FormMutate): Promise<T> {
    return firstValueFrom(this.coreService.callForms("formMutation", query));
  }
}
