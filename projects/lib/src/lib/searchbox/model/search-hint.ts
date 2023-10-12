import { FormBlock, FormRoot } from "@codeffekt/ce-core-data";
import { SearchToken } from "../search-token";

export interface SearchHint {
    label?: string;
    value: any;
    description?: string;
}

export interface SearchHintsContext {
    model: FormRoot;
    token?: SearchToken;
    filter: string;
    block?: FormBlock;
}


export interface SearchHints {
    values: SearchHint[];
    context: SearchHintsContext;
}