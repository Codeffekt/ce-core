import { AccountSettings, FormProject, FormSharing } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";
export class ProjectsQueryBuilder extends FormQueryBuilder {

    private constructor() {
        super();
        this.setQueryField({
            field: 'root',
            onMeta: true,
            op: '=',
            value: FormProject.ROOT
        });
    }

    static fromCurrentAccount(account: AccountSettings, type?: string): ProjectsQueryBuilder {
        const builder = new ProjectsQueryBuilder();
        builder.setQueryField({
            field: 'account',
            op: '=',
            value: account.account
        });
        return builder.setProjectType(type);
    }
     
    static fromCurrentUser(account: AccountSettings, type?: string): ProjectsQueryBuilder {
        const builder = new ProjectsQueryBuilder();
        builder.setFiltersField([{
            op: '=',
            queryFields: [{
                field: 'root',
                op: '=',
                value: FormSharing.ROOT,
                onMeta: true
            }, {
                field: 'login',
                op: '=',
                value: account.login
            }]
        }]);
        return builder.setProjectType(type);
    }

    setProjectType(type?: string) {
        if(type === '*' || type === undefined) {
            return this;
        }
        this.setQueryField({
            field: 'type',
            op: '=',
            value: type
        });
        return this;
    }  
    
    setFilter(filterValue: string) {
        if (filterValue === "") {
            this.clearQueryField("name");
        } else {
            this.setQueryField({
                field: "name",
                op: "~~*",
                value: `%${filterValue}%`
            });
        }
    }

    clearFilter(): void {
        this.clearQueryField("name");
    }
}