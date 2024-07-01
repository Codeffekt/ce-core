import {
    FormQueryField, FormQuerySortField,
    FormQuery, IndexType, FormQueryFieldLogic, FormQueryFieldExpr, FormAggField, FormFilter
} from "@codeffekt/ce-core-data";

const DEFAULT_LIMIT = 10;

export class FormQueryBuilder {

    protected queryFields: FormQueryField[] = [];
    protected queryFieldLogic: FormQueryFieldLogic;
    protected sortFields: FormQuerySortField[] = [];
    protected extSubFields: string[] = [];
    protected pagination: Partial<FormQuery> = FormQueryBuilder.fromPagination(0, DEFAULT_LIMIT);
    protected extMode!: Partial<FormQuery>;
    protected root: IndexType;
    protected queryRootFields: FormQueryField[] = [];
    protected sortRootFields: FormQuerySortField[] = [];
    protected filterFields: FormFilter[] = [];
    protected aggFields: FormAggField[] = [];

    static fromPagination(pageIndex: number, pageSize: number): FormQuery {
        return {
            limit: pageSize,
            offset: pageIndex * pageSize
        };
    }

    static fromExtMode(isExtmode: boolean): FormQuery {
        return {
            extMode: isExtmode
        }
    }

    constructor() { }

    setPagination(pageIndex: number, pageSize: number) {
        this.pagination = FormQueryBuilder.fromPagination(pageIndex, pageSize);
    }

    setPaginationFirstPage() {
        this.pagination = FormQueryBuilder.fromPagination(0, this.pagination?.limit || DEFAULT_LIMIT);
    }

    setExtMode(isExtMode: boolean) {
        this.extMode = FormQueryBuilder.fromExtMode(isExtMode);
    }

    setRoot(root: IndexType) {
        // this.root = root;
        this.setQueryField({
            field: 'root',
            onMeta: true,
            value: root
        });
    }

    getSort(): FormQuerySortField {
        return this.sortFields.length ? this.sortFields[0] : { field: 'ctime', order: 'desc', onMeta: true };
    }

    setSort(sortField: FormQuerySortField) {
        if (sortField) {
            this.setSortField(sortField)
        }
    }

    clearSortField(fieldName: string) {
        this.clearGenericField(fieldName, this.sortFields);
    }

    clearSortFields() {
        this.sortFields = [];
    }

    clearRootSort() {
        this.sortRootFields = [];
    }

    setRootSort(sortField: FormQuerySortField) {
        if (sortField) {
            this.setSortRootField(sortField);
        }
    }

    clearSortRootField(fieldName: string) {
        this.clearGenericField(fieldName, this.sortRootFields);
    }

    clearFilter() {
        throw new Error("Must be implemented");
    }

    setFilter(value: string) {
        throw new Error("Must be implemented");
    }

    create(): FormQuery {
        return {
            queryFields: this.createQueryFields(),
            sortFields: this.createSortFields(),
            extSubFields: this.extSubFields.length ? this.extSubFields : undefined,            
            aggFields: this.aggFields.length ? this.aggFields : undefined,
            filters: this.filterFields.length ? this.filterFields : undefined,
            ...this.pagination,
            ...this.extMode,
            root: this.root
        };
    }

    clearQueryFieldLogic() {
        this.queryFieldLogic = undefined;
    }

    setQueryFieldLogic(logic: FormQueryFieldLogic) {
        this.queryFieldLogic = logic;
    }

    protected createQueryFields(): FormQueryFieldLogic | FormQueryFieldExpr[] {

        const queryFieldsAndMeta = [
            ...this.queryFields,
            ...this.queryRootFields.map((qrf => ({ ...qrf, onMeta: true })))
        ];

        if (this.queryFieldLogic && queryFieldsAndMeta.length) {
            return [...queryFieldsAndMeta, this.queryFieldLogic];
        }

        return this.queryFieldLogic ? this.queryFieldLogic : queryFieldsAndMeta.length ? queryFieldsAndMeta : undefined;
    }

    private createSortFields(): FormQuerySortField[] {
        const sortFieldsAndMeta = [
            ...this.sortFields,
            ...this.sortRootFields.map((qrf => ({ ...qrf, onMeta: true })))
        ];
        return sortFieldsAndMeta.length ? sortFieldsAndMeta : undefined;
    }

    protected setSubField(sf: string) {
        if (!this.extSubFields.includes(sf)) {
            this.extSubFields.push(sf);
        }
    }

    protected clearSubField(sf: string) {
        this.extSubFields = this.extSubFields.filter(sfElt => sfElt !== sf);
    }

    protected setFiltersField(ff: FormFilter[]) {
        this.filterFields = ff;
    }

    protected setQueryField(qf: FormQueryField) {
        this.setGenericField(qf, this.queryFields);
    }

    protected clearQueryField(fieldName: string) {
        this.clearGenericField(fieldName, this.queryFields);
    }

    protected clearAggField(fieldName: string) {
        this.clearGenericField(fieldName, this.aggFields);
    }

    protected setSortField(sf: FormQuerySortField) {
        this.setGenericField(sf, this.sortFields);
    }

    protected setSortRootField(sf: FormQuerySortField) {
        this.setGenericField(sf, this.sortRootFields);
    }

    protected setAggField(ag: FormAggField) {
        this.setGenericField(ag, this.aggFields);
    }

    protected setQueryRootField(qf: FormQueryField) {
        this.setGenericField(qf, this.queryRootFields);
    }

    protected clearQueryRootField(fieldName: string) {
        this.clearGenericField(fieldName, this.queryRootFields);
    }

    private setGenericField<T extends FormQuerySortField | FormQueryField | FormAggField>(f: T, elts: T[]) {
        const existingIdx = elts.findIndex(elt => elt.field === f.field);
        if (existingIdx !== -1) {
            elts[existingIdx] = f;
        } else {
            elts.push(f);
        }
    }

    private clearGenericField<T extends FormQuerySortField | FormQueryField>(fieldName: string, elts: T[]) {
        const existingIdx = elts.findIndex(elt => elt.field === fieldName);
        if (existingIdx !== -1) {
            elts.splice(existingIdx, 1);
        }
    }
}