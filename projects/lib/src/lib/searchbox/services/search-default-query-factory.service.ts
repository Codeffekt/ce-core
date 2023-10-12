import { Injectable } from '@angular/core';
import { FormQueryFieldOp } from '@codeffekt/ce-core-data';

export interface SearchQueryField {
    field: string;
    operator?: FormQueryFieldOp;
}

export type SearchDefaultQueryFields = { [formRoot: string]: SearchQueryField[] };

export type SearchDefaultQueryFieldsStore = {
    defaultFields: SearchDefaultQueryFields;
}

/**
 * @description
 * This factory provides fields that are used in the searchbox when no token has been detected
 * and a text value is entered and submitted (i.e. a user types 'contact' and press enter without selecting
 * any field type among suggested hints
 */
@Injectable({ providedIn: 'root' })
export class SearchDefaultQueryFactoryService {

    private defaultQueryFields: SearchQueryField[] = [
        { field: '@id' },
        { field: '@title' },
        { field: '@root' },
    ]

    private store: SearchDefaultQueryFieldsStore = {
        defaultFields: {}
    };

    constructor() { }

    getDefaultQueryFields(formRoot: string): SearchQueryField[] {
        const existingDefaultQueryFields = this.store.defaultFields[formRoot];
        return existingDefaultQueryFields ?? this.defaultQueryFields;
    }
 
    setDefaultQueryFields(queryFields: SearchDefaultQueryFields) {
        Object.keys(queryFields).forEach(root => this.store.defaultFields[root] = queryFields[root]);
        var d = 3;
    }
}