import { AccountSettings, FormProject, FormSharing, IndexType } from "@codeffekt/ce-core-data";
import { FormsFormQueryBuilder } from "../../forms";

export class ProjectsSharedFormQueryBuilder extends FormsFormQueryBuilder {

    static forType(user: AccountSettings, type: IndexType) {
        const builder = new ProjectsSharedFormQueryBuilder(user);        
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

        this.setFiltersField([{
            op: '=',
            queryFields: [{
                field: 'root',
                op: '=',
                value: FormSharing.ROOT,
                onMeta: true
            }, {
                field: 'login',
                op: '=',
                value: user.login
            }]
        }]);
    }    

    private withType(type?: IndexType) {
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