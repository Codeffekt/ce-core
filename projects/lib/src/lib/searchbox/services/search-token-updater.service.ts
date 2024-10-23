import { Injectable } from "@angular/core";
import { SearchToken } from "../search-token";
import { SearchTokensLabelService } from "./search-tokens-label.service";


@Injectable()
export class SearchTokenUpdater {

    constructor(private searchLabelService: SearchTokensLabelService) { }

    updateField(token: SearchToken, field: string): SearchToken {
        if (!field) {
            return token;
        }

        token.field = {
            value: field,
            label: this.searchLabelService.getFieldLabelForValue(field) as any
        }
        return token;
    }

    updateOp(token: SearchToken, op: string): SearchToken {
        if (!op) {
            return token;
        }

        token.op = {
            value: op,
            label: this.searchLabelService.getOperatorLabelForValue(op) as any
        }
        return token;
    }

    updateValue(token: SearchToken, value: any): SearchToken {
        if (!value) {
            return token;
        }

        token.value = {
            value,
            label: this.searchLabelService.getValueLabelForValue(token.field?.value, value) as any
        };
        return token;
    }
}