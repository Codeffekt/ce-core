import { Injectable } from "@angular/core";
import { FormBlockType } from "@codeffekt/ce-core-data";
import { SearchHint } from "../../model/search-hint";
import { SearchHintBaseBuilder } from "../search-hint-base.builder";

export interface SearchOpHint extends SearchHint {
    elligibleTypes: '*' | FormBlockType[]
}

@Injectable()
export class SearchOpHintBuilder extends SearchHintBaseBuilder {

    static ops: SearchOpHint[] =
        [{
            value: "=",
            description: "est",
            elligibleTypes: '*'
        },
        {
            value: ">",
            description: "supérieur",
            elligibleTypes: ['number', 'timestamp']
        },
        {
            value: "<",
            description: "inférieur",
            elligibleTypes: ['number', 'timestamp']
        },
        {
            value: "~~*",
            description: "contient",
            elligibleTypes: ['number', 'text', 'index', 'mask']
        }];

    getHints(): SearchHint[] {
        var hints = [...SearchOpHintBuilder.ops]

        if (this.fieldType) {
            hints = this.filterHintsByFieldType(hints, this.fieldType);
        }

        return hints;
    }

    private filterHintsByFieldType(hints: SearchOpHint[], type: FormBlockType): SearchOpHint[] {
        return hints.filter(hint => hint.elligibleTypes === '*' || hint.elligibleTypes.findIndex(type => type === type) !== -1);
    }
}  