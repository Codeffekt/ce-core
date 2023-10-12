import { FormQueryDatasource } from "@codeffekt/ce-core";
import { DbArrayRes, FormInstance, FormInstanceExt, FormQuery, FormQueryField, FormQueryFieldExpr, FormQueryFieldLogic } from "@codeffekt/ce-core-data";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Data, PeriodicElement, PeriodicElementWrapper } from "./data";

export class TableWrapperExampleFormQueryDataSource extends FormQueryDatasource<PeriodicElementWrapper>{    

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> { 

        const sort = query.sortFields ? query.sortFields[0] : undefined;        
        const offset = query.offset;
        const limit = query.limit;

        const sortedData = Data.sortData(Data.VALUES, sort);
        const filteredData = this.applyFilters(sortedData, query.queryFields);
        const data = Data.sliceData(filteredData, offset, limit);

        return of({
           elts: data,
           limit,
           offset,
           total: filteredData.length
        }).pipe(
            delay(100),
        ); 
    }

    protected applyFilters(data: FormInstance[], filter: FormQueryFieldLogic | FormQueryFieldExpr[] | undefined) {
        if(!filter) {
            return data;
        }    

        if(Array.isArray(filter)) {
            return Data.filterData(data, (<FormQueryField> filter[0]).value as any);
        } else if(filter.or) {
            return Data.filterDataLogicOr(data, (<FormQueryFieldLogic> filter).or as FormQueryField[]);
        } else if(filter.and) {
            return Data.filterDataLogicAnd(data, (<FormQueryFieldLogic> filter).and as FormQueryField[]);
        } else {
            return data;
        }
    }

    protected wrap(form: FormInstanceExt, res?: DbArrayRes<FormInstanceExt>): PeriodicElementWrapper { 
        const wrapper = new PeriodicElementWrapper(form);
        return wrapper;
    }
}
