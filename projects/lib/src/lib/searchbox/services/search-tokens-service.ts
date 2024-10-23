import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { SearchToken, SearchTokenUtils } from '../search-token';
import { SearchTokenUpdater } from './search-token-updater.service';
import { SearchTokenMatcher } from '../search-token-matchers/search-token-matcher';
import { SearchTokenOpMatcher } from '../search-token-matchers/search-token-op-matcher';
import { SearchTokensQueryService } from './search-tokens-query.service';

export type SearchTokenPartType = 'field' | 'operator' | 'value';

@Injectable()
export class SearchTokensService {

    private _currentTokenPart$ = new BehaviorSubject<SearchTokenPartType>('field');
    private _tokens: SearchToken[] = [];
    private _tokens$ = new ReplaySubject<SearchToken[]>(1);

    constructor(
        private queryTokenService: SearchTokensQueryService,
        private tokenUpdater: SearchTokenUpdater, private tokenMatcher: SearchTokenMatcher) { }

    onInputValueChanged(value: string, opts: { forceValue?: boolean } = {}) {
        // Retrieve and add completed tokens
        const tokens = this.tokenMatcher.match(value);
        if (tokens) {
            this.addTokens(tokens);
        } else {
            this.completeCurrentTokenWithValue(value, opts);
        }
    }

    removeToken(token: SearchToken) {
        const tokenIndex = this._tokens.indexOf(token);
        if (tokenIndex != -1) {
            this._tokens.splice(tokenIndex, 1);
            this.onTokenChanges();
        }
    }

    removeAllToken() {
        this._tokens = [];
        this.onTokenChanges();
    }

    removeLastTokenPart(): string | null {
        const lastToken = this.getLastToken();
        if (!lastToken) {
            return null;
        }

        const removedPartValue = SearchTokenUtils.removeLastPart(lastToken);

        if (SearchTokenUtils.isEmpty(lastToken)) {
            this.removeToken(lastToken);
        }
        this.onTokenChanges();
        return removedPartValue;
    }

    getTokens(): SearchToken[] {
        return this._tokens;
    }

    tokensValues(): Observable<SearchToken[]> {
        return this._tokens$;
    }

    tokenProgressChanges(): Observable<SearchTokenPartType> {
        return this._currentTokenPart$;
    }

    getCurrentToken(): SearchToken | null {
        const lastToken = this.getLastToken();
        return !lastToken || SearchTokenUtils.isCompleted(lastToken) ? null : lastToken;
    }

    private completeCurrentTokenWithValue(value: string, opts: { forceValue?: boolean } = {}) {
        const currentToken = this.getCurrentToken();

        if (!currentToken) {
            if (opts.forceValue && !!value) {
                const tokens = this.queryTokenService.getTokensFromValue(value);
                this.addTokens(tokens);
            }
            return;
        }

        if (!currentToken.op) {
            const op = opts.forceValue ? value : new SearchTokenOpMatcher().match(value);
            if (op) {
                this.addTokenOp(currentToken, op)
            }
            return;
        }

        if (!currentToken.value && value.indexOf(' ') != -1 || opts.forceValue) {
            this.addTokenValue(currentToken, value.trim());
        }
    }

    private addTokens(tokens: SearchToken[]) {
        if (!tokens.length) {
            return;
        }

        const currentToken = this.getCurrentToken();
        if (SearchTokenUtils.isUncompleted(currentToken!)) {
            this.removeToken(currentToken!);
        }
        this._tokens.push(...tokens);
        this.onTokenChanges();
    }

    private getLastToken(): SearchToken | null {
        if (!this._tokens.length) {
            return null;
        }

        return this._tokens[this._tokens.length - 1];
    }

    private addTokenOp(token: SearchToken, op: string) {
        this.tokenUpdater.updateOp(token, op);
        this.onTokenChanges();
    }

    private addTokenValue(token: SearchToken, value: string) {
        this.tokenUpdater.updateValue(token, value);
        this.onTokenChanges();
    }

    private updateCurrentTokenPart() {
        const currentToken = this.getCurrentToken();
        const currentPart = this._currentTokenPart$.value;
        const newPart = SearchTokenUtils.getTokenPartFrom(currentToken!);

        if (currentPart != newPart) {
            this._currentTokenPart$.next(newPart);
        }
    }

    private onTokenChanges() {
        this.updateCurrentTokenPart();
        this._tokens$.next(this._tokens);
    }
}