import { Injectable } from "@angular/core";
import { DbArrayRes, FormInstance, FormQuery, IndexType } from "@codeffekt/ce-core-data";
import { Observable, of } from "rxjs";
import { CeCoreService } from "./ce-core.service";

@Injectable({
    providedIn: 'root'
})
export class CeAssetsService {

    constructor(private coreService: CeCoreService) { }

    getProjectFormsQuery(pid: IndexType, query: FormQuery): Observable<DbArrayRes<FormInstance>> {
        return this.getFormsQuery({...query, ref: pid});
    }

    getFormsQuery(query: FormQuery): Observable<DbArrayRes<FormInstance>> {
        return this.coreService.callAssets("getFormsQuery", query);
    }

    deleteAssets(pid?: IndexType, assets: IndexType[] = [], deleteFile = true): Observable<boolean> {

        if(!assets.length) {
            return of(true);
        }

        return this.coreService.callAssets("deleteAssets", pid, assets, deleteFile);
    }
}