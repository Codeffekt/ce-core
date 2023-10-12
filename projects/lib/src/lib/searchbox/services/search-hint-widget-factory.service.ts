import { Injectable, Type } from '@angular/core';
import { FormBlock } from '@codeffekt/ce-core-data';

export type SearchHintWidgets = { [key: string]: Type<any> };

export interface SearchHintWidgetsStore {
    field: SearchHintWidgets;
    blockType: SearchHintWidgets;
}

@Injectable({ providedIn: 'root' })
export class SearchHintWidgetFactoryService {

    private store: SearchHintWidgetsStore = {
        field: {},
        blockType: {}
    }

    constructor() { }

    setBuilders(builders: { fields: SearchHintWidgets, blockTypes: SearchHintWidgets }) {
        Object.keys(builders.fields).forEach(field => this.store.field[field] = builders.fields[field]);
        Object.keys(builders.blockTypes).forEach(blockType => this.store.blockType[blockType] = builders.blockTypes[blockType]);
    }

    getBuilder(block: FormBlock): Type<any> | undefined {
        return this.store.field[block.field] ?? this.store.blockType[block.type];
    }
}