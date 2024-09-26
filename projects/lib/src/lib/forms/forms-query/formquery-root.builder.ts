import { IndexType } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

export class FormQueryRootBuilder extends FormQueryBuilder {        

    constructor() {
      super();
    }      
  
    setExcludedIndices(indices: IndexType[]) {
      if(indices) {
        this.setQueryField({
          field: "id",
          op: "!=",
          values: indices,
          onMeta: true
        });
      }       
    }         
    
  }