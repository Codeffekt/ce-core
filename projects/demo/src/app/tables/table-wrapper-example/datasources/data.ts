import { FormBlockEntity, FormInstance, FormInstanceBase, FormQueryField, FormQuerySortField, FormRootEntity, FormWrapper } from "@codeffekt/ce-core-data";

@FormRootEntity({ id: PeriodicElement.ROOT, title: "Element Périodique" })
export class PeriodicElement {

    static readonly ROOT = 'forms-periodic-element';

    @FormBlockEntity({ type: 'text' })
    name: string;

    @FormBlockEntity({ type: 'number' })
    position: number;

    @FormBlockEntity({ type: 'number' })
    weight: number;

    @FormBlockEntity({ type: 'text' })
    symbol: string;
}

export class PeriodicElementWrapper extends FormWrapper<PeriodicElement> {
    constructor(form?: FormInstance) {
        super(new PeriodicElement(), form);
    }
}

export const ELEMENT_DATA: FormInstanceBase[] = [
    { id: "aaa", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 1 }, name: { type: "text", field: "name", value: 'Hydrogen' }, weight: { type:"number", field: "weight", value: 1.0079 }, symbol: { type: "text", field: "symbol", value: 'H' } } },
    { id: "bbb", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 2 }, name: { type: "text", field: "name", value: 'Helium' }, weight: { type:"number", field: "weight", value: 4.0026 }, symbol: { type: "text", field: "symbol", value: 'He' } } },
    { id: "ccc", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 3 }, name: { type: "text", field: "name", value: 'Lithium' }, weight: { type:"number", field: "weight", value: 6.941 }, symbol: { type: "text", field: "symbol", value: 'Li' } } },
    { id: "ddd", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 4 }, name: { type: "text", field: "name", value: 'Beryllium' }, weight: { type:"number", field: "weight", value: 9.0122 }, symbol: { type: "text", field: "symbol", value: 'Be' } } },
    { id: "eee", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 5 }, name: { type: "text", field: "name", value: 'Boron' }, weight: { type:"number", field: "weight", value: 10.811 }, symbol: { type: "text", field: "symbol", value: 'B' } } },
    { id: "fff", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 6 }, name: { type: "text", field: "name", value: 'Carbon' }, weight: { type:"number", field: "weight", value: 12.0107 }, symbol: { type: "text", field: "symbol", value: 'C' } } },
    { id: "ggg", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 7 }, name: { type: "text", field: "name", value: 'Nitrogen' }, weight: { type:"number", field: "weight", value: 14.0067 }, symbol: { type: "text", field: "symbol", value: 'N' } } },
    { id: "hhh", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 8 }, name: { type: "text", field: "name", value: 'Oxygen' }, weight: { type:"number", field: "weight", value: 15.9994 }, symbol: { type: "text", field: "symbol", value: 'O' } } },
    { id: "iii", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 9 }, name: { type: "text", field: "name", value: 'Fluorine' }, weight: { type:"number", field: "weight", value: 18.9984 }, symbol: { type: "text", field: "symbol", value: 'F' } } },
    { id: "jjj", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 10 }, name: { type: "text", field: "name", value: 'Fluorine' }, weight: { type:"number", field: "weight", value: 18.9984 }, symbol: { type: "text", field: "symbol", value: 'F' } } },
    { id: "kkk", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 11 }, name: { type: "text", field: "name", value: 'Copernicium' }, weight: { type:"number", field: "weight", value: 112.0079 }, symbol: { type: "text", field: "symbol", value: 'Cn' } } },
    { id: "lll", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 12 }, name: { type: "text", field: "name", value: 'Nihonium' }, weight: { type:"number", field: "weight", value: 286.15 }, symbol: { type: "text", field: "symbol", value: 'Hn' } } },
    { id: "mmm", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 13 }, name: { type: "text", field: "name", value: 'Flérovium' }, weight: { type:"number", field: "weight", value: 284.321 }, symbol: { type: "text", field: "symbol", value: 'Fl' } } },
    { id: "nnn", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 14 }, name: { type: "text", field: "name", value: 'Moscovium' }, weight: { type:"number", field: "weight", value: 47.512 }, symbol: { type: "text", field: "symbol", value: 'Mc' } } },
    { id: "ooo", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 15 }, name: { type: "text", field: "name", value: 'Livermorium' }, weight: { type:"number", field: "weight", value: 87.45647 }, symbol: { type: "text", field: "symbol", value: 'Lv' } } },
    { id: "ppp", title: "Element Périodique", ctime: 1634650915687, content: { position: { type: 'number', field: "position", value: 16 }, name: { type: "text", field: "name", value: 'Tennesse' }, weight: { type:"number", field: "weight", value: 155.456 }, symbol: { type: "text", field: "symbol", value: 'Ts' } } },
];


function resolveQueryField(qf: FormQueryField, src: any) {
    if (!qf.type) {
        return src?.toString().toLowerCase().includes(qf.value);
    } else {
        const qfDouble = parseFloat(qf.value as any);
        return qf.op === ">" ? src > qfDouble : qf.op === "<" ? src < qfDouble : Math.abs(src - qfDouble) < 0.000001;
    }
}

export class Data {

    static get VALUES(): FormInstance[] {
        return ELEMENT_DATA.map(elt => ({ ...elt, root: PeriodicElement.ROOT, valid: true }));
    }

    static getTotalCount() {
        return ELEMENT_DATA.length;
    }

    static sortData(data: FormInstance[], sort: FormQuerySortField | undefined): FormInstance[] {
        if (!sort) {
            return data;
        }

        return data.sort((l, r) => {

            const leftValue = l.content[sort.field].value;
            const rightValue = r.content[sort.field].value;

            switch (sort.field) {
                case 'position':
                case 'weight': {
                    return (sort.order === 'asc' ? leftValue - rightValue : rightValue - leftValue);
                }
                default:
                    return (sort.order === 'asc' ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue));
            }

        });
    }

    static filterData(data: FormInstance[], filter: string | undefined): FormInstance[] {
        return !!filter ? data.filter(data => data.content.name.value.toLowerCase().includes(filter.toLowerCase())) : data;
    }

    static filterDataLogicOr(data: FormInstance[], fields: FormQueryField[] | undefined): FormInstance[] {
        if (!fields?.length) {
            return data;
        }
        return data.filter(elt => fields.find(field => resolveQueryField(field, elt.content[field.field].value)) !== undefined);
    }

    static filterDataLogicAnd(data: FormInstance[], fields: FormQueryField[] | undefined): FormInstance[] {
        if (!fields?.length) {
            return data;
        }

        return data.filter(elt => !fields.filter(field => !resolveQueryField(field, elt.content[field.field].value)).length);
    }

    static sliceData(data: FormInstance[], offset: number | undefined, limit: number | undefined): FormInstance[] {
        if (offset == undefined && limit == undefined) {
            return data;
        }
        return data.slice(offset, offset + limit);
    }
}
