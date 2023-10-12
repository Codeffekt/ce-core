import { Injectable } from "@angular/core";
import { SearchToken, SearchTokenUtils } from "../search-token";
import { SearchTokenUpdater } from "../services/search-token-updater.service";
import { SearchTokensLabelService } from "../services/search-tokens-label.service";

const WORD_EXP = "a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9";
const FILTER_REGEXP = `([\\$]?\\w+):([><=]*)([${WORD_EXP}]*)`;

export interface SearchTokenMatcherResults {
    tokens: SearchToken[],
    field: string;
    op: string;
    value: string;
}

@Injectable()
export class SearchTokenMatcher {

    constructor(private tokenUpdater: SearchTokenUpdater) { }

    match(value: string): SearchToken[] | null {
        var tokens: SearchToken[] = [];

        const fieldValueRegexp = new RegExp(FILTER_REGEXP, 'g');

        let match = fieldValueRegexp.exec(value);

        if (!match) {
            return null;
        }

        do {
            const token = this.buildTokenFromMatch(match);
            tokens.push(token)
        } while ((match = fieldValueRegexp.exec(value)) !== null);

        // Accept only completed token and last token possiblity uncompleted
        tokens = this.filterCompletedOrlastTokens(tokens);

        return tokens;
    }

    private buildTokenFromMatch(match: RegExpExecArray) {
        const field = match[1];
        const op = match[2];
        const value = match[3];

        var token: SearchToken = {};
        this.tokenUpdater.updateField(token, field);
        this.tokenUpdater.updateOp(token, op);
        this.tokenUpdater.updateValue(token, value);
        return token;
    }

    private filterCompletedOrlastTokens(tokens: SearchToken[]) {
        return tokens.filter((token, index) => index === tokens.length - 1 || SearchTokenUtils.isCompleted(token));
    }
}