import { Injectable } from "@angular/core";
import { CeCoreService } from "./ce-core.service";
import { FormInstance, FormWrapper, IndexType } from "@codeffekt/ce-core-data";
import { distinct, firstValueFrom, interval, mergeMap, takeWhile } from "rxjs";
import { CeFormEditorService } from "./ce-form-editor.service";

function isProcessingFinished(form: FormInstance): boolean {
    const status = FormWrapper.getFormValue('status', form);
    return status !== "RUNNING" && status !== "PENDING";    
}

@Injectable({
    providedIn: 'root'
})
export class CeProcessingService {

    constructor(
        private coreService: CeCoreService,
        private formEditorService: CeFormEditorService,
    ) { }

    start(pid: IndexType) {
        return firstValueFrom(this.coreService.callProcessing("start", pid));
    }

    cancel(pid: IndexType) {
        return firstValueFrom(this.coreService.callProcessing("cancel", pid));
    }

    status(pid: IndexType) {
        return firstValueFrom(this.coreService.callProcessing("status", pid));
    }

    listen(pid: IndexType) {
        return interval(1000).pipe(
            mergeMap(x => this.formEditorService.getForm(pid, { forceReload: true })),
            distinct((form) => form.form.core.mtime),
            takeWhile(form => !isProcessingFinished(form.form.core), true),
        );
    }
}