import { Injectable } from "@angular/core";
import { SearchHint } from "../../model/search-hint";
import { SearchHintBaseBuilder } from "../search-hint-base.builder";
import moment from 'moment';

@Injectable()
export class SearchHintTimestampBuilder extends SearchHintBaseBuilder {

    getHints(): SearchHint[] {
        return [
            {
                label: "Aujourd'hui",
                value: '{-;day;day;0}'
            },
            {
                label: "Hier",
                value: '{-;day;day;1}'
            },
            {
                label: "La semaine dernière",
                value: '{-;weeks;day;1}'
            },
        ];
    }

    getHintFromValue(value: string): SearchHint | undefined {
        const hint = super.getHintFromValue(value);
        if (hint) {
            return hint;
        }


        var date = moment(value, 'DD/MM/YYYY');
        date = date.isValid() ? date : moment(parseInt(value));

        return {
            label: date.isValid() ? date.format('DD/MM/YYYY') : 'Date invalide',
            value
        }
    }
}