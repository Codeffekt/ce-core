import {
    AccountSettings, DbArrayRes,
    FormBlock, FormInstanceExt,
    FormInstanceMaskWrapper,
    FormQuery, FormWrapper,
    IndexType
} from '@codeffekt/ce-core-data';
import { Observable, of } from 'rxjs';
import { FormMaskBuilder } from '../../forms';
import { FormQueryDatasource } from '../../forms/form-datasource/form-query.datasource';
import { CeCoreService } from '../../services/ce-core.service';

export class CeProjectAssocDatasource extends FormQueryDatasource<FormWrapper> {

    pid!: IndexType;
    assoc: FormBlock | undefined;
    mask!: FormInstanceMaskWrapper;
    members: AccountSettings[] = [];

    constructor(
        private coreService: CeCoreService) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.assoc ? this.coreService.callFormsQuery(this.pid, query) : of({
            elts: [],
            total: 0,
            limit: 0,
            offset: 0
        });
    }

    protected wrap(form: FormInstanceExt): FormWrapper {

        const author = form.author ? this.members.find(member => member.id === form.author) : undefined;

        if (this.mask) {
            const formInstanceMasked = new FormMaskBuilder().build(form, this.mask);
            return FormWrapper.fromForm(formInstanceMasked,
                author);
        } else {
            return FormWrapper.fromForm(form, author);
        }
    }
}
