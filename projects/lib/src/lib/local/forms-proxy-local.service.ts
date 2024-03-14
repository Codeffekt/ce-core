import { Injectable, inject } from "@angular/core";
import { FormsLocalService } from "./forms-local.service";
import { CeFormsService } from "../services/ce-forms.service";
import { FormInstance, FormInstanceExt, FormQuery, IndexType } from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})
export class FormsProxyLocalService {

    private readonly localService = inject(FormsLocalService);
    private readonly formsService = inject(CeFormsService);

    constructor() {}

    getRawFormQuery(id: IndexType, query?: FormQuery): Observable<FormInstance | FormInstanceExt> {
        if(this.localService.hasForm(id)) {
            return this.localService.getRawFormQuery(id, query);
        } else {
            return this.formsService.getRawFormQuery(id, query);
        }
    }
}