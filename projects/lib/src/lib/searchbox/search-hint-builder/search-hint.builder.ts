import { Injectable } from "@angular/core";
import { SearchHints, SearchHintsContext } from "../model/search-hint";
import { SearchTokenUtils } from "../search-token";
import { SearchFieldHintBuilder } from "./builders/search-field-hint.builder";
import { SearchOpHintBuilder } from "./builders/search-op-hint.builder";
import { SearchValueHintBuilder } from "./builders/search-value-hint.builder";

@Injectable()
export class SearchHintBuilder {

    constructor(
        private fieldHintBuilder: SearchFieldHintBuilder,
        private opHintBuilder: SearchOpHintBuilder,
        private valueHintBuilder: SearchValueHintBuilder,
    ) { }

    build(context: SearchHintsContext): SearchHints {

        const part = SearchTokenUtils.getTokenPartFrom(context.token);

        var res: SearchHints = {
            values: [],
            context
        }

        if (part === 'field') {
            res.values = this.fieldHintBuilder.withContext(context).build();
        }

        if (part === 'operator') {
            res.values = this.opHintBuilder.withContext(context).build();
        }

        if (part === 'value') {
            res.values = this.valueHintBuilder.withContext(context).build();
        }

        return res;;
    }
}