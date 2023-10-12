import { Injectable, Injector, Type } from "@angular/core";
import { SearchHint } from "../../model/search-hint";
import { SearchHintBaseBuilder } from "../search-hint-base.builder";
import { SearchHintValueBuilderStoreService } from "../search-hint-builder-store";

@Injectable()
export class SearchValueHintBuilder extends SearchHintBaseBuilder {

    constructor(
        private injector: Injector,
        private store: SearchHintValueBuilderStoreService) {
        super();
    }

    getHints(): SearchHint[] {
        const hints = this.getBuilder()?.getHints() ?? [];
        return hints;
    }

    getHintFromValue(value: string): SearchHint {
        return this.getBuilder()?.getHintFromValue(value);
    }

    protected getBuilder(): SearchHintBaseBuilder | null {
        const builderType: Type<any> = this.store.getBuilder(this.block);
        if (builderType) {
            const builder: SearchHintBaseBuilder = this.injector.get(builderType);
            builder.withContext(this.context);
            return builder;
        }
        return null;
    }
}