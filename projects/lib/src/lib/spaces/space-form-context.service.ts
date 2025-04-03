import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, distinct, filter, Observable, startWith, switchMap } from "rxjs";
import { FormInfo } from "../models/form-info";
import { FormBlock, FormUtils, IndexType } from "@codeffekt/ce-core-data";
import { CeEventsService } from "../services/ce-events.service";

@Injectable({ providedIn: 'root' })
export class SpaceFormContextService {

    private currentFormInfos$ = new BehaviorSubject<FormInfo[]>([]);
    private currentForm$ = new BehaviorSubject<FormInfo | undefined>(undefined);
    private eventsService = inject(CeEventsService);

    setForms(formInfos: FormInfo[]) {
        this.currentFormInfos$.next(formInfos);
        const nextForm = formInfos.length ? formInfos[formInfos.length - 1] : undefined;
        this.currentForm$.next(nextForm);
    }

    findBlock(root: IndexType, field: IndexType): FormBlock {
        const formInfo = this.findFormFromRoot(root);
        if (!formInfo) {
            throw new Error(`Form root ${root} not found in current space`);
        }
        const block = FormUtils.getBlockFromField(formInfo.form.core, field);
        if (!block) {
            throw new Error(`Block ${field} not found in form root ${root}`);
        }
        return block;
    }

    findFormFromRoot(root: IndexType) {
        return this.currentFormInfos$.getValue().find(formInfo => formInfo.form.core.root === root);
    }

    setCurrentForm(form: FormInfo) {
        this.currentForm$.next(form);
    }

    onCurrentForm(): Observable<FormInfo> {
        return this.currentForm$.asObservable().pipe(
            filter(form => form !== undefined),
            switchMap(form =>
                this.eventsService.onFormUpdate(form!.form.core.id).pipe(
                    distinct((form) => form!.form.core.mtime),
                    startWith(form)
                )
            ),
        );
    }

    onCurrentForms() {
        return this.currentFormInfos$.asObservable();
    }
}