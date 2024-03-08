import { Injectable } from "@angular/core";
import { FormsLocalDatabaseService } from "./forms-local-database.service";
import { FormInstance, FormInstanceExt, FormQuery, IndexType } from "@codeffekt/ce-core-data";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FormsLocalService {

    constructor(private db: FormsLocalDatabaseService) {
    }

    getRawFormQuery(id: IndexType, query?: FormQuery): Observable<FormInstance | FormInstanceExt> {
        return of(this.db.getForm(id));
    }
}