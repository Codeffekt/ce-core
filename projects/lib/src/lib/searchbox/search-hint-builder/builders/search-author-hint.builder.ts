import { Injectable } from "@angular/core";
import { CeAccountService } from "../../../services";
import { SearchHint } from "../../model/search-hint";
import { SearchHintBaseBuilder } from "../search-hint-base.builder";

@Injectable()
export class SearchAuthorHintBuilder extends SearchHintBaseBuilder {

    constructor(private accountService: CeAccountService) {
        super();
    }

    getHints(): SearchHint[] {
        const members = this.accountService.getCurrentMembers();
        var hints: SearchHint[] = members.map(member => {
            return {
                label: `${member.firstName} ${member.lastName}`,
                description: member.login,
                value: member.id
            };
        })

        return hints;
    }
}