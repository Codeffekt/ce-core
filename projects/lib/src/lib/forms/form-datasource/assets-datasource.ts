import {
    IndexType,
    FormQuery,
    DbArrayRes, FormInstance, 
    FormWrapper, AssetElt
} from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { CeAssetsService } from '../../services/ce-assets.service';
import { FormQueryDatasource } from './form-query.datasource';

function convertDateToTimestamp(value: string | number | Date): number {
    return value instanceof Date ? value.getTime() : isNaN(parseInt(value as string)) ? undefined : parseInt(value as string);
}
export class AssetsDatasource extends FormQueryDatasource<AssetElt> {

    pid!: IndexType;

    constructor(private assetsService: CeAssetsService) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstance>> {

        return this.assetsService.getProjectFormsQuery(this.pid, query);
    }

    protected wrap(form: FormInstance): AssetElt {
        return this.convertFormToAssetElt(form);
    }

    private convertFormToAssetElt(form: FormInstance) {

        const props = FormWrapper.createProps(form);

        const assetEltProps = props;
        const assetEltCtime = props.ctime ? convertDateToTimestamp(props.ctime) : undefined;
        return {
            ...assetEltProps,
            ctime: assetEltCtime
        };
    }
}
