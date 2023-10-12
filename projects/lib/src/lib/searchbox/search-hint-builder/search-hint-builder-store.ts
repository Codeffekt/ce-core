import { Injectable, Type } from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";

export type SearchHintValueBuilders = { [field: string]: Type<any> };


export interface SearchHintValueBuilderStore {
    field: SearchHintValueBuilders;
    blockType: SearchHintValueBuilders;
}

@Injectable({ providedIn: 'root' })
export class SearchHintValueBuilderStoreService {

    private store: SearchHintValueBuilderStore = {
        field: {},
        blockType: {}
    }

    setBuilders(builders: { fields: SearchHintValueBuilders, blockTypes: SearchHintValueBuilders }) {
        Object.keys(builders.fields).forEach(field => this.store.field[field] = builders.fields[field]);
        Object.keys(builders.blockTypes).forEach(blockType => this.store.blockType[blockType] = builders.blockTypes[blockType]);
    }

    getBuilder(block:FormBlock) : Type<any> | undefined {
        return this.store.field[block.field] ?? this.store.blockType[block.type];
    }
}