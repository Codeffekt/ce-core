import { AccountSettings, FormProject, IndexType } from "@codeffekt/ce-core-data";
import { FormsFormQueryBuilder } from "../../forms";

export class ProjectsOwnedFormQueryBuilder extends FormsFormQueryBuilder {

    static forType(user: AccountSettings, type: IndexType) {
        const builder = new ProjectsOwnedFormQueryBuilder(user);        
        builder.withType(type);
        return builder;
    }

    private constructor(user: AccountSettings) {
        super();

        this.setQueryField({
            field: "root",
            op: "=",
            value: FormProject.ROOT,
            onMeta: true
        });

        this.setQueryField({
            field: "author",
            op: "=",
            value: user.id,
            onMeta: true
        });
    }    

    private withType(type: IndexType) {
        if (type === '*' || type === undefined) {
            return this;
        }
        this.setQueryField({
            field: "type",
            op: "=",
            value: type
        });
        return this;
    }
}