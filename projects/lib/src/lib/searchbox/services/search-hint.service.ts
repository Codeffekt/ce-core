import { DOWN_ARROW, I, UP_ARROW } from "@angular/cdk/keycodes";
import { Injectable } from "@angular/core";
import { FormBlock, FormInstance, FormRoot, FormUtils } from "@codeffekt/ce-core-data";
import { filter, Observable, ReplaySubject, Subject, Subscription } from "rxjs";
import { CeFormQueryService } from "../../services/ce-form-query.service";
import { FORMROOT_META, META_FIELD_OP } from "../search-hint-builder/search-hint-base.builder";
import { SearchHintBuilder } from "../search-hint-builder/search-hint.builder";
import { SearchHint, SearchHints, SearchHintsContext } from "../model/search-hint";
import { SearchTokensService } from "./search-tokens-service";

@Injectable()
export class SearchHintService {

    private filter!: string;
    private model!: FormRoot;
    private subscription!: Subscription;
    private activeHint: SearchHint | undefined;
    private activeHint$ = new Subject<SearchHint>();
    private hints?: SearchHints;
    private hints$ = new ReplaySubject<SearchHints>(1);

    constructor(
        private hintBuilder: SearchHintBuilder,
        private searchTokenService: SearchTokensService,
        private queryService: CeFormQueryService
    ) {
        this.listenTokenProgress();
        this.listenModel();
    }

    applyfilter(filter: string | undefined) {
        this.filter = filter as any;
        this.updateHints();
    }

    destroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    hintsValues(): Observable<SearchHints> {
        return this.hints$;
    }

    getActiveHint(): SearchHint | null {
        return this.activeHint as any;
    }

    activeHintChanges(): Observable<SearchHint | null> {
        return this.activeHint$;
    }

    resetActiveHint() {
        this.updateActiveHint(null);
    }

    onKeyboardDown(keycode: number) {
        if (keycode === DOWN_ARROW) {
            this.selectNextHint();
        }
        if (keycode === UP_ARROW) {
            this.selectPreviousHint();
        }
    }

    private listenModel() {
        this.subscription.add(
            this.queryService.evt()
                .pipe(filter(evt => evt.type === 'model'))
                .subscribe(_ => this.setModel(this.queryService.getModel())
                )
        );
    }

    private setModel(model: FormRoot) {
        this.model = model;
        this.updateHints();
    }

    private selectNextHint() {
        var index = this.hints!.values.indexOf(this.activeHint as any) + 1;
        index = index % this.hints!.values.length;
        this.updateActiveHint(this.hints!.values[index]);
    }

    private selectPreviousHint() {
        var index = this.hints!.values.indexOf(this.activeHint as any) - 1;
        index = index === -1 ? this.hints!.values.length - 1 : index;
        this.updateActiveHint(this.hints!.values[index]);
    }

    private updateActiveHint(hint: SearchHint | null) {
        this.activeHint = hint as any;
        this.activeHint$.next(this.activeHint as any);
    }

    private updateHints() {
        const currentToken = this.searchTokenService.getCurrentToken();
        const context: SearchHintsContext = { model: this.model, token: currentToken as any, filter: this.filter, block: this.getBlockFromField(currentToken?.field?.value) as any}
        this.hints = this.hintBuilder.build(context);
        this.hints$.next(this.hints);
    }

    private listenTokenProgress() {
        this.subscription =
            this.searchTokenService.tokenProgressChanges()
                .subscribe(tokenPart => this.updateHints());
    }

    private getBlockFromField(field: string | null): FormBlock | null {
        if (!field) {
            return null;
        }
        const isMetaField = field.slice(0, 1) === META_FIELD_OP;
        const model = isMetaField ? FORMROOT_META : this.model;

        // Remove $ character if field is meta
        field = isMetaField ? field.slice(1) : field;

        // Finding block with current field and copy it
        const block = {
            ...FormUtils.getBlocks(<FormInstance>model)
                .find(block => block.field === field)
        };

        block.field = isMetaField ? `${META_FIELD_OP}${field}` : block.field;

        return block as any;

    }
}