import { Injectable } from '@angular/core';
import { CeFormQueryService } from '../../services';
import { SearchToken } from '../search-token';
import { SearchDefaultQueryFactoryService } from './search-default-query-factory.service';
import { SearchTokensLabelService } from './search-tokens-label.service';

@Injectable()
export class SearchTokensQueryService {

    constructor(
        private queryService: CeFormQueryService,
        private tokenLabelService: SearchTokensLabelService,
        private searchDefaultQueryFactory: SearchDefaultQueryFactoryService
    ) { }


    getTokensFromValue(value: string): SearchToken[] {
        const formRootId = this.queryService.getModel().id;
        const searchQueryFields = this.searchDefaultQueryFactory.getDefaultQueryFields(formRootId);
        const tokens = searchQueryFields.map(queryField => {

            return {
                field: {
                    label: this.tokenLabelService.getFieldLabelForValue(queryField.field),
                    value: queryField.field
                },
                op: {
                    label: this.tokenLabelService.getOperatorLabelForValue(queryField.operator!),
                    value: queryField.operator,
                },
                value: {
                    label: value,
                    value
                }
            }
        })

        return tokens as any;
    }
}