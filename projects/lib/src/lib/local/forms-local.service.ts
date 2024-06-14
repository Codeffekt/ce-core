import { Injectable } from "@angular/core";
import { FormsLocalDatabaseService } from "./forms-local-database.service";
import { DbArrayRes, FormInstance, FormInstanceExt, FormQuery, FormRoot, IndexType } from "@codeffekt/ce-core-data";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FormsLocalService {

    constructor(private db: FormsLocalDatabaseService) {
    }

    hasForm(id: IndexType): boolean {
        return this.db.getForm(id) !== undefined;
    }

    getRawFormQuery(id: IndexType, query?: FormQuery): Observable<FormInstance | FormInstanceExt> {
        return of(this.db.getForm(id));
    }

    getRawFormsQuery(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return of({
            total: 0,
            elts: [],
            limit: query.limit,
            offset: query.offset,
        });
    }

    getRawFormsRootQuery(query: FormQuery): Observable<DbArrayRes<FormRoot>> {
        return of({
            total: 0,
            elts: [],
            limit: query.limit,
            offset: query.offset
        });
    }
}