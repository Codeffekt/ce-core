import { Component, computed, inject, input, Signal } from '@angular/core';
import { FormRoot } from '@codeffekt/ce-core-data';
import { SearchTokenMatcher } from '../../searchbox/search-token-matchers/search-token-matcher';
import { SearchHintsContext, SearchToken, SearchTokenUpdater } from '../../searchbox';
import { SearchTokensLabelService } from '../../searchbox/services/search-tokens-label.service';
import { SearchFieldHintBuilder } from '../../searchbox/search-hint-builder/builders/search-field-hint.builder';
import { SearchOpHintBuilder } from '../../searchbox/search-hint-builder/builders/search-op-hint.builder';
import { SearchValueHintBuilder } from '../../searchbox/search-hint-builder/builders/search-value-hint.builder';
import { CommonModule } from '@angular/common';
import { CeLayoutModule } from '../../layout';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ce-filters-label',
  imports: [
    CommonModule,   
    CeLayoutModule,
    MatIconModule,
  ],
  providers: [
    SearchTokenMatcher,
    SearchTokenUpdater,
    SearchTokensLabelService,
    SearchFieldHintBuilder,
    SearchOpHintBuilder,
    SearchValueHintBuilder,
  ],
  templateUrl: './filters-label.component.html',
  styleUrl: './filters-label.component.scss'
})
export class FiltersLabelComponent {
  filterExpr = input.required<string>();  
  root = input.required<FormRoot>();

  private matcher = inject(SearchTokenMatcher);
  private fieldHintBuilder = inject(SearchFieldHintBuilder);
  private opHintBuilder = inject(SearchOpHintBuilder);
  private valueHintBuilder = inject(SearchValueHintBuilder);

  tokens: Signal<SearchToken[]> = computed(() => {
    const context: SearchHintsContext = {
      model: this.root(),
      filter: this.filterExpr(),
    };
    this.fieldHintBuilder.withContext(context);
    this.opHintBuilder.withContext(context);
    this.valueHintBuilder.withContext(context);
    return this.matcher.match(this.filterExpr()) ?? [];
  });
}
