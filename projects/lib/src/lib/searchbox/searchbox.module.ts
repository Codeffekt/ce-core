import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { CeLayoutModule } from "../layout/layout.module";
import { CeIconModule } from "../widgets";
import { SearchAuthorHintBuilder } from "./search-hint-builder/builders/search-author-hint.builder";
import { SearchHintBooleanBuilder } from "./search-hint-builder/builders/search-boolean-hint.builder";
import { SearchSelectHintBuilder } from "./search-hint-builder/builders/search-select-hint.builder";
import { SearchHintTimestampBuilder } from "./search-hint-builder/builders/search-timestamp-hint.builder";
import { SearchHintValueBuilderStoreService } from "./search-hint-builder/search-hint-builder-store";
import { SearchHintDropdownComponent } from "./search-hint-dropdown/search-hint-dropdown.component";
import { SearchHintWidgetFactoryComponent } from './search-hint-widgets/search-hint-widget-factory/search-hint-widget-factory.component';
import { SearchInputTokenComponent } from "./search-input-token/search-input-token.component";
import { SearchInputComponent } from "./search-input/search-input.component";
import { SearchTokenPartComponent } from "./search-token-part/search-token-part.component";
import { SearchTokenComponent } from "./search-token/search-token.component";
import { SearchboxComponent } from "./searchbox.component";
import { SearchHintTimestampWidgetComponent } from './search-hint-widgets/search-hint-timestamp-widget/search-hint-timestamp-widget.component';
import { SearchHintWidgetFactoryService } from "./services/search-hint-widget-factory.service";

@NgModule({
    declarations: [
        SearchHintDropdownComponent,
        SearchInputComponent,
        SearchInputTokenComponent,
        SearchTokenComponent,
        SearchTokenPartComponent,
        SearchboxComponent,
        SearchHintWidgetFactoryComponent,
        SearchHintTimestampWidgetComponent,
    ],
    imports: [
        CommonModule,
        CeLayoutModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        CeLayoutModule,
        OverlayModule,
        MatButtonModule,
        CeIconModule,
        MatDatepickerModule,
        MatMomentDateModule
    ],
    exports: [
        SearchboxComponent,
    ]
})
export class CeSearchboxModule {
    constructor(
        private readonly hintWidgetStore: SearchHintWidgetFactoryService,
        private readonly valueBuilderStore: SearchHintValueBuilderStoreService,
    ) {


        this.hintWidgetStore.setBuilders({
            fields: {},
            blockTypes: {
                'timestamp': SearchHintTimestampWidgetComponent
            }
        });

        this.valueBuilderStore.setBuilders(
            {
                fields: {
                    '$author': SearchAuthorHintBuilder
                },
                blockTypes: {
                    'timestamp': SearchHintTimestampBuilder,
                    'select': SearchSelectHintBuilder,
                    'boolean': SearchHintBooleanBuilder
                }
            }
        );
    }
} 