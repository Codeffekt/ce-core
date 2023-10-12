import { FormFilter, FormQuery, IndexType } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

export class FormQueryIndexBuilder extends FormQueryBuilder {      
  
  private filters: FormFilter[] = [];

    constructor() {
      super();
    }  
  
    setFormRoot(formRoot: IndexType) {
      this.setQueryField({
        field: "root",
        op: "=",
        value: formRoot,
        onMeta: true
      });       
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
    
    setExcludedRef(ref: IndexType) {
      this.filters = [{
        op: "!=",
        ref
      }];
    }

    create(): FormQuery {
      return {
          ...super.create(),
          filters: this.filters
      };
  }
  }