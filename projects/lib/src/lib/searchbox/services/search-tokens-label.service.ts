import { Injectable } from '@angular/core';
import { SearchFieldHintBuilder } from '../search-hint-builder/builders/search-field-hint.builder';
import { SearchOpHintBuilder } from '../search-hint-builder/builders/search-op-hint.builder';
import { SearchValueHintBuilder } from '../search-hint-builder/builders/search-value-hint.builder';

@Injectable()
export class SearchTokensLabelService {

  constructor(
    private searchFieldHintBuilder: SearchFieldHintBuilder,
    private searchOpHintBuilder: SearchOpHintBuilder,
    private searchValueHintBuilder: SearchValueHintBuilder
  ) {}

  getFieldLabelForValue(value: string): string | null {
    const hint = this.searchFieldHintBuilder.getHintFromValue(value)
    return hint?.label;
  }

  getOperatorLabelForValue(value: string): string | null {
    const hint = this.searchOpHintBuilder.getHintFromValue(value)
    return hint?.description;
  }

  getValueLabelForValue(field: string | undefined, value: string): string | null {
    const hint = this.searchValueHintBuilder.getHintFromValue(value)
    return hint?.label;
  }
}
