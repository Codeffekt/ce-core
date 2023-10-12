import { Type } from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";

export interface IProjectAssocContent {    
    block: FormBlock;
  }
export interface ProjectAssocFactoryComponents {
    [type: string]: Type<any>;
}

export interface ProjectAssocFactoryOptions {
    components: ProjectAssocFactoryComponents;
}
