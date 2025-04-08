import { FormQueryBuilder } from "./formquery.builder";

export interface FormQueryFilter {   
    clearFilter(qb: FormQueryBuilder): void;
    setFilter(qb: FormQueryBuilder, value: string): void;
}