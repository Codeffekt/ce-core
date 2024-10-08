import { FormSpaceEditorFormat } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";
export class SpacesEditorFormatQueryBuilder extends FormQueryBuilder {

    private constructor() {
        super();
        this.setQueryField({
            field: 'root',
            onMeta: true,
            op: '=',
            value: FormSpaceEditorFormat.ROOT
        });
        this.setExtMode(true);
    }  
    
    static create() {
        const builder = new SpacesEditorFormatQueryBuilder();
        return builder;
    }
}