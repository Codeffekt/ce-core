import { Injectable } from "@angular/core";
import { SearchHint } from "../../model/search-hint";
import { SearchHintBaseBuilder } from "../search-hint-base.builder";

@Injectable()
export class SearchSelectHintBuilder extends SearchHintBaseBuilder {

    getHints(): SearchHint[] {
        return this.block!.params.options.map((option: any) => {
            return {
                label: option.label,
                value: option.value
            };
        });
    }
}