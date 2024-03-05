import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListItemActionsComponent } from './list-item-actions/list-item-actions.component';
import { ListItemAvatarComponent } from './list-item-avatar/list-item-avatar.component';
import { ListItemChipsComponent } from './list-item-chips/list-item-chips.component';
import { ListItemContentComponent } from './list-item-content/list-item-content.component';
import { ListItemFactoryComponent } from './list-item-factory/list-item-factory.component';
import { ListItemIconPropComponent, ListItemIconPropListComponent } from './list-item-icon-prop/list-item-icon-prop.component';
import { ListItemLabelComponent } from './list-item-label/list-item-label.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list.component';
import { ListItemDefaultComponent } from './list-item-default/list-item-default.component';
import { CeIconsModule } from '../icons/icons.module';
import { CePaginatorModule } from '../paginator/paginator.module';
import { ListItemStoreService } from './list-item-factory/list-item-store.service';
import { CeSearchboxModule } from '../searchbox/searchbox.module';
import { CePipesModule } from '../pipes/pipes.module';
import { CeFormsPipesModule } from '../forms-pipes';



@NgModule({
    declarations: [
        ListHeaderComponent,
        ListItemComponent,
        ListItemActionsComponent,
        ListItemAvatarComponent,
        ListItemChipsComponent,
        ListItemContentComponent,
        ListItemIconPropComponent,
        ListItemIconPropListComponent,
        ListItemLabelComponent,
        ListItemFactoryComponent,
        ListComponent,
        ListItemDefaultComponent
    ],
    imports: [
        CommonModule,
        MatTooltipModule,
        MatIconModule,
        MatMenuModule,
        MatMenuModule,
        MatButtonModule,
        CeIconsModule,
        CePaginatorModule,        
        CePipesModule,
        CeFormsPipesModule,
        CeSearchboxModule
    ],
    exports: [
        ListHeaderComponent,
        ListItemComponent,
        ListItemActionsComponent,
        ListItemAvatarComponent,
        ListItemChipsComponent,
        ListItemContentComponent,
        ListItemIconPropComponent,
        ListItemIconPropListComponent,
        ListItemLabelComponent,
        ListItemFactoryComponent,
        ListComponent
    ],
    providers: [],
})
export class CeListModule {
    constructor(storeService: ListItemStoreService) {
        storeService.setDefaultComponent(ListItemDefaultComponent);
    }
}
