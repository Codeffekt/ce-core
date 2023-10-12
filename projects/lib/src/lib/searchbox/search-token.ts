import { SearchTokenPartType } from "./services/search-tokens-service";

export interface SearchToken {
    field?: SearchTokenProperty;
    op?: SearchTokenProperty;
    value?: SearchTokenProperty;
}

export interface SearchTokenProperty {
    value: any;
    label: string;
}

export class SearchTokenUtils {

    static isCompleted(token: SearchToken): boolean {
        return !!token && !!token.field && !!token.op && !!token.value;
    }

    static isUncompleted(token: SearchToken): boolean {
        return !this.isCompleted(token);
    }

    static isEmpty(token: SearchToken): boolean {
        return !token.field && !token.op && !token.value;
    }

    static getQuery(tokens: SearchToken[]): string {
        return tokens
        .filter(token => this.isCompleted(token))
        .reduce((prev, token) => prev + `${token.field.value}:${token.op.value || ''}${token.value.value || ''} `, '');
    }

    static removeLastPart(token: SearchToken): string | null {
        const { field, op, value } = token;

        if (!!token.value) {
            token.value = undefined;
            return value.value;
        }

        if (!!token.op) {
            token.op = undefined;
            return op.value;
        }

        if (!!token.field) {
            token.field = undefined;
            return field.value;
        }

        return null;
    }

    static getTokenPartFrom(token: SearchToken | undefined): SearchTokenPartType {

        if (!token?.field) {
            return 'field';
        }

        if (!token?.op) {
            return 'operator';
        }

        if (!token?.value) {
            return 'value';
        }

        return 'field';
    }
}