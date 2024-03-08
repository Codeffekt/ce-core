import { Injectable } from "@angular/core";
import { LocalDatabase } from "./local-database";
import { FormInstance, FormInstanceExt, IndexType } from "@codeffekt/ce-core-data";

@Injectable({ providedIn: 'root' })
export class FormsLocalDatabaseService {

    private db: LocalDatabase = {};

    getForm(id: IndexType): FormInstance | FormInstanceExt {
        return this.db[id];
    }

    setForms(forms: LocalDatabase) {
        Object.keys(forms).forEach(type => this.db[type] = forms[type]);
    }
}