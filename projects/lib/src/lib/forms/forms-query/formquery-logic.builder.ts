import {
    FormQueryField, FormQueryFieldLogic,
    FormQueryFieldOp, FormRoot, FormUtils,
} from "@codeffekt/ce-core-data";
import { Utils } from "../../utils/Utils";

const FORMROOT_META: FormRoot = {
    id: undefined,
    ctime: undefined,
    title: undefined,
    content: {
        author: {
            field: "author",
            type: "index"
        },
        id: {
            field: "id",
            type: "index"
        },
        root: {
            field: "root",
            type: "index"
        },
        ctime: {
            field: "ctime",
            type: "timestamp"
        },
        mtime: {
            field: "mtime",
            type: "timestamp"
        },
        title: {
            field: "title",
            type: "text"
        },
        valid: {
            field: "valid",
            type: "boolean"
        }
    }
}

const EMPTY_MODEL: FormRoot = {
    id: undefined,
    ctime: undefined,
    title: undefined,
    content: {}
};

const META_FIELD_OP = "$";

export const POSSIBLED_OPS: FormQueryFieldOp[] = ['<', '>', '=', '~~*'];

const WORD_EXP = "a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9";
const WORDS = `[${WORD_EXP}]+[${WORD_EXP}\\-]*`;
const DATE_FILTER = `{(?<subOp>[-+]);(?<unit>years|months|weeks|days|seconds);(?<startOf>hour|day|isoWeek|week|month|year);(?<duration>\\d)}`
/**
 * Expression permettant de retrouver le field, l'operateur et la value.
 * Il y a donc 3 groups accessibles dans le tableau match
 * Exemple de filtre simple: $ctime:>1021321
 * Exemple de filtre avec un sous-opérateur: $ctime:>{-;weeks;day;1}
 */
export const FIELD_OP_VALUE_REGEXP = `(?<field>[\\$]?\\w+):(?<op>[><=]|~~\\*)?(?<value>${WORDS}|${DATE_FILTER})`;

export class FormQueryLogicBuilder {

    private model = EMPTY_MODEL;

    setModel(model: FormRoot) {
        this.model = model;
    }

    fromFilter(value: string): FormQueryFieldLogic | undefined {

        const fieldValueRegexp = new RegExp(FIELD_OP_VALUE_REGEXP, "g");

        let match = fieldValueRegexp.exec(value);

        if (!match) {
            return undefined;
        }

        const queryFields = [];
        do {
            queryFields.push(this.createQueryField(match.groups));
        } while ((match = fieldValueRegexp.exec(value)) !== null);

        return {
            and: queryFields.filter(qf => qf !== undefined)
        };
    }

    private createQueryField(groups: any): FormQueryField | undefined {

        const isMetaField = groups.field.slice(0, 1) === META_FIELD_OP;

        const model = isMetaField ? FORMROOT_META : this.model;

        const formQueryField = {
            field: isMetaField ? groups.field.slice(1) : groups.field,
            op: groups.op,
            value: groups.value,
            onMeta: isMetaField,
        };

        return this.createQueryFieldFromModel(model, formQueryField, groups);
    }

    private createQueryFieldFromModel(
        model: FormRoot,
        qf: FormQueryField<string>,
        groups: any
    ): FormQueryField {
        const block = FormUtils.getBlockFromField(model, qf.field);
        if (!block) {
            return undefined;
        }
        if (block.type === "number") {
            return this.createQueryFieldFromNumber(qf);
        } else if (block.type === "timestamp") {
            if (groups.subOp) {
                return this.createQueryFieldFromDate(qf, groups);
            }
            return this.createQueryFieldFromTimestamp(qf, groups);
        } else if (block.type === "boolean") {
            return this.createQueryFieldFromBoolean(qf);
        } else {
            return this.createQueryFieldFromText(qf);
        }
    }

    private createQueryFieldFromNumber(qf: FormQueryField<string>): FormQueryField {
        return {
            ...qf,
            type: "double",
        };
    }

    private createQueryFieldFromDate(qf: FormQueryField<string>, groups: any): FormQueryField {
        return {
            ...qf,
            type: 'date',
            value: {
                op: groups.subOp,
                unit: groups.unit,
                startOf: groups.startOf,
                duration: groups.duration
            }
        }
    }

    private createQueryFieldFromTimestamp(qf: FormQueryField<string>, groups: any): FormQueryField {
        const value = isNaN(parseInt(qf.value)) ?
            Utils.getTimeFromDateStr(qf.value) :
            qf.value;
        return {
            ...qf,
            type: "timestamp",
            value
        };
    }

    private createQueryFieldFromText(qf: FormQueryField<string>): FormQueryField {
        return {
            ...qf,
            value: qf.op === "~~*" ? `%${qf.value}%` : qf.value
        };
    }

    private createQueryFieldFromBoolean(qf: FormQueryField<string>): FormQueryField {
        return {
            ...qf,
            op: "=",
            value: qf.value === "true" || qf.value === "1" ? "true" : "false"
        };
    }
}