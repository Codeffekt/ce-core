import { Injectable } from "@angular/core";
import { FormInfo } from "@codeffekt/ce-core";
import { IndexType } from "@codeffekt/ce-core-data";
import { BehaviorSubject } from "rxjs";
import { FormInfosService } from "./form-infos.service";

@Injectable({ providedIn: 'root' })
export class FormEditorService {

    protected formInfo!: FormInfo;

    protected formInfo$: BehaviorSubject<FormInfo | undefined> = new BehaviorSubject(undefined);

    constructor(
        private formInfos: FormInfosService,               
    ) {    
    }

    setCurrentFormInfo(formInfo: FormInfo) {
        this.formInfo = formInfo;
        this.formInfo$.next(this.formInfo);
    }

    getCurrentFormInfo(): FormInfo {
        return this.formInfo;
    }

    onFormInfo() {
        return this.formInfo$;
    }   

    async getForm(id: IndexType): Promise<FormInfo> {
        const formInfo = await this.formInfos.getFormInfo(id);
        this.setCurrentFormInfo(formInfo);
        return formInfo;
    }
}