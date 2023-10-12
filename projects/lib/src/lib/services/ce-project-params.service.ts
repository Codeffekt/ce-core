import { Injectable } from "@angular/core";
import { FormProjectWrapper, ProjectParams } from "@codeffekt/ce-core-data";
import { CeFormsParamsService } from "./ce-forms-params.service";

const DEFAULT_PROJECT_PARAMS: Partial<ProjectParams> = {    
} as any;

@Injectable({ providedIn: 'root' })
export class CeProjectParamsService {

    private params: Partial<ProjectParams> = DEFAULT_PROJECT_PARAMS;

    constructor(private formsParamsService: CeFormsParamsService) {
    }

    setParamsFromProject(project: FormProjectWrapper) {
        this.params = {
            ...DEFAULT_PROJECT_PARAMS,
            ...project.props.params
        };

        this.formsParamsService.mergeParams(this.params);

        return true;
    }    
}