import { inject, Injectable } from "@angular/core";
import { CeFormEditorService, FormInfo } from "@codeffekt/ce-core";
import { IndexType } from "@codeffekt/ce-core-data";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class FormPathService {

    private currentPathElts: string[] = [];
    private currentForm$: BehaviorSubject<FormInfo | undefined> = new BehaviorSubject(undefined);
    private currentFormInfos$: BehaviorSubject<FormInfo[]> = new BehaviorSubject([]);
    private formEditorService = inject(CeFormEditorService);    

    async setCurrentPath(path: string) {
        const pathElts = [... new Set(path.split(","))]; // remove duplicates
        const formInfos = await Promise.all(
            pathElts.map(path => this.formEditorService.getForm(path))
        );
        this.currentFormInfos$.next(formInfos);
        this.currentForm$.next(formInfos.length ? formInfos[formInfos.length - 1] : undefined);
        this.currentPathElts = pathElts;
    }

    getPath(formId: IndexType) {
        const existingEltId = this.currentPathElts.indexOf(formId);
        const nextPathElts = [
            ...(existingEltId === -1 ? this.currentPathElts :
                this.currentPathElts.slice(0, existingEltId)), formId
        ];
        return nextPathElts.join(",");
    }    

    setCurrentForm(form: FormInfo) {
        this.currentForm$.next(form);
    }

    onCurrentForm() {
        return this.currentForm$;
    }

    onCurrentForms() {
        return this.currentFormInfos$;
    }
}