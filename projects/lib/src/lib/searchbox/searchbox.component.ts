import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CeFormQueryService } from '../services';
import { SearchAuthorHintBuilder } from './search-hint-builder/builders/search-author-hint.builder';
import { SearchHintBooleanBuilder } from './search-hint-builder/builders/search-boolean-hint.builder';
import { SearchFieldHintBuilder } from './search-hint-builder/builders/search-field-hint.builder';
import { SearchOpHintBuilder } from './search-hint-builder/builders/search-op-hint.builder';
import { SearchSelectHintBuilder } from './search-hint-builder/builders/search-select-hint.builder';
import { SearchHintTimestampBuilder } from './search-hint-builder/builders/search-timestamp-hint.builder';
import { SearchValueHintBuilder } from './search-hint-builder/builders/search-value-hint.builder';
import { SearchHintBuilder } from './search-hint-builder/search-hint.builder';
import { SearchTokenMatcher } from './search-token-matchers/search-token-matcher';
import { SearchHintService } from './services/search-hint.service';
import { SearchTokenUpdater } from './services/search-token-updater.service';
import { SearchTokensLabelService } from './services/search-tokens-label.service';
import { SearchTokensQueryService } from './services/search-tokens-query.service';
import { SearchTokensService } from './services/search-tokens-service';
import { SearchTokenUtils } from './search-token';
import { Observable, map, startWith } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ce-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  providers: [
    SearchHintService,
    SearchTokensService,
    SearchTokenUpdater,
    SearchTokenMatcher,
    SearchTokensLabelService,
    SearchValueHintBuilder,
    SearchOpHintBuilder,
    SearchFieldHintBuilder,
    SearchHintBuilder,
    SearchAuthorHintBuilder,
    SearchSelectHintBuilder,
    SearchHintTimestampBuilder,
    SearchHintBooleanBuilder,
    SearchTokensQueryService
  ]
})
export class SearchboxComponent<T = any> implements OnDestroy {

  @Input() debounceTime = 1000;
  @Input() placeholder!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  searchDisabled$: Observable<boolean>;

  constructor(
    private queryService: CeFormQueryService<T>,
    private searchHintService: SearchHintService,
    private searchTokensQueryService: SearchTokensQueryService,
    private tokensService: SearchTokensService
  ) { 
    this.searchDisabled$ = this.tokensService.tokensValues().pipe(
      startWith(this.tokensService.getTokens()),
      map(tokens => !tokens.length));

  }

  ngOnDestroy(): void {
    this.searchHintService.destroy();
  }

  reset() {
    this.reload();
  }

  search() {
    const tokens = this.tokensService.getTokens();
    const query = SearchTokenUtils.getQuery(tokens);

    if (!query) {
      this.clearQueryFilter();
    } else {
      this.updateQueryFilter(query);
    }
  }

  private updateQueryFilter(query?: string) {
    this.queryService.setFilter(query as any);
    this.reload();
  }

  private clearQueryFilter() {
    this.queryService.clearFilter();
    this.reload();
  }

  private reload() {
    this.queryService.setPaginationFirstPage();
    this.queryService.load();
  }
}
