import { Injectable } from "@angular/core";
import { SearchHint } from "../../model/search-hint";
import { SearchHintBaseBuilder } from "../search-hint-base.builder";

@Injectable()
export class SearchHintBooleanBuilder extends SearchHintBaseBuilder {

    getHints(): SearchHint[] {
        return [
            {
                label: "Oui",
                value: true
            },
            {
                label: "Non",
                value: false
            }
        ];
    }
}
