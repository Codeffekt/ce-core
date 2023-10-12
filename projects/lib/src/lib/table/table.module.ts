import { NgModule } from "@angular/core";
import { TableComponent } from "./table.component";
import { TableCellFactoryComponent } from './table-cell-factory/table-cell-factory.component';
import { TableCellDefaultComponent } from './table-cell-default/table-cell-default.component';
import { TableCellAssetComponent } from './table-cell-asset/table-cell-asset.component';
import { TableCellStoreService } from "./table-cell-factory/table-cell-store.service";
import { CommonModule } from "@angular/common";
import { CePipesModule } from "../pipes";

@NgModule({
    declarations: [
        TableComponent,
        TableCellFactoryComponent,
        TableCellDefaultComponent,
        TableCellAssetComponent,
    ],
    exports: [
        TableComponent,
        TableCellFactoryComponent,
        TableCellDefaultComponent,
        TableCellAssetComponent,
    ],
    imports: [
        CommonModule,
        CePipesModule
    ]
})
export class CeTableModule {
    constructor(private readonly tableCellStore: TableCellStoreService) {
        this.tableCellStore.setComponents({
            'asset': TableCellAssetComponent
        });
    }
}