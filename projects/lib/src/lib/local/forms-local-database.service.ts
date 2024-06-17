import { Injectable } from "@angular/core";
import { LocalDatabase } from "./local-database";
import { FormInstance, FormInstanceExt, FormRoot, IndexType } from "@codeffekt/ce-core-data";

@Injectable({ providedIn: 'root' })
export class FormsLocalDatabaseService {

    private forms: LocalDatabase = {};
    private roots: LocalDatabase<FormRoot> = {};

    getForm(id: IndexType): FormInstance | FormInstanceExt {
        return this.forms[id];
    }

    setForms(forms: LocalDatabase) {
        Object.keys(forms).forEach(type => this.forms[type] = forms[type]);
    }

    getRoot(id: IndexType): FormRoot {
        return this.roots[id];
    }

    getRoots(): FormRoot[] {
        return Object.keys(this.roots).map(key => this.roots[key]);        
    }

    setRoots(roots: LocalDatabase<FormRoot>) {
        Object.keys(roots).forEach(type => this.roots[type] = roots[type]);
    }
}