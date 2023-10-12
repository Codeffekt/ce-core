import { Injectable } from "@angular/core";
import { CeFormsParams } from "../models/ce-forms-params";
@Injectable({
    providedIn: 'root'
})
export class CeFormsParamsService {

    params: CeFormsParams = {};

    constructor(        
    ) {
        // this.mergeParams(appService.getParams());
    }

    setAllParams(params: CeFormsParams) {
        this.params = params;
    }

    mergeParams(params: CeFormsParams) {
        this.params = { ...this.params, ...params };
    }

    getAllParams() {
        return this.params;
    }

    getParamsFromId<T>(id: string): T {
        return this.params[id];
    }
}