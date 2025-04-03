import { inject, Injectable } from "@angular/core";
import { IndexType } from "@codeffekt/ce-core-data";
import { CeFormEditorService } from "../services/ce-form-editor.service";
import { SpaceFormContextService } from "./space-form-context.service";

@Injectable({ providedIn: 'root'})
export class SpaceFormPathService {    

    private currentPathElts: string[] = [];    
    private formEditorService = inject(CeFormEditorService); 
    private spaceFormContextService = inject(SpaceFormContextService);

    constructor() {        
    }    

    async setCurrentPath(path: string) {
        const pathElts = [... new Set(path.split(","))]; // remove duplicates
        const formInfos = await Promise.all(
            pathElts.map(path => this.formEditorService.getForm(path))
        );
        this.spaceFormContextService.setForms(formInfos);                       
        this.currentPathElts = pathElts;
    }

    getPath(formId: IndexType) {
        const existingEltId = this.currentPathElts.indexOf(formId);
        const nextPathElts = [
            ...(existingEltId === -1 ? this.currentPathElts :
                this.currentPathElts.slice(0, existingEltId)), formId
        ];
        return nextPathElts.join(",");
    }        
}