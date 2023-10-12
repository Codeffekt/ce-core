import { Injectable } from "@angular/core";
import { FormBlockType, FormInstance, FormUtils } from "@codeffekt/ce-core-data";
import { SearchHint } from "../../model/search-hint";
import { FORMROOT_META, SearchHintBaseBuilder } from "../search-hint-base.builder";

export interface SearchFieldHint extends SearchHint {
    type: FormBlockType
}

@Injectable()
export class SearchFieldHintBuilder extends SearchHintBaseBuilder {

    getHints(): SearchHint[] {

        // build hints from meta fields
        const metaBlocks = FormUtils.getBlocks(<FormInstance>FORMROOT_META)
        const metaFieldHints = metaBlocks.map(block => {
            return { label: block.label, value: `$${block.field}:` };
        });

        // build hints from model blocks
        const blocks = this.model ? FormUtils.getBlocks(<FormInstance>this.model) : [];
        const blockFieldHints = blocks.map(block => {
            return { label: block.label, value: `${block.field}:` };
        });

        return [...metaFieldHints, ...blockFieldHints];
    }

    getHintFromValue(value: string): SearchHint | undefined {
        // TODO: Remove ":"
        return this.getHints().find(hint => hint.value === `${value}:`);
    }
}