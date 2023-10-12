import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, map } from 'rxjs';
import { SearchToken } from '../search-token';
import { SearchHintService } from '../services/search-hint.service';
import { SearchTokensService } from '../services/search-tokens-service';

@UntilDestroy()
@Component({
  selector: 'ce-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnDestroy {

  tokens$: Observable<SearchToken[]> = this.tokensService.tokensValues();
  clearSearchEnabled$ = this.tokensService.tokensValues().pipe(map(tokens => tokens.length));

  @Output() search = new EventEmitter();

  constructor(
    private hintsService: SearchHintService,
    private tokensService: SearchTokensService
  ) { }

  ngOnDestroy(): void {
    this.hintsService.destroy();
  }

  onSearch() {
    this.search.emit();
  }

  clearSearch() {
    this.tokensService.removeAllToken();
    this.search.emit('');
  }
}
