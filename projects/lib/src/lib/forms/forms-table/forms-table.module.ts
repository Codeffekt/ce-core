import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { CeFormsPipesModule } from "../../forms-pipes";
import { FormsTableComponent } from "./forms-table.component";

@NgModule({
    declarations: [
        FormsTableComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,        
        MatIconModule,
        CeFormsPipesModule,
    ],
    exports: [
        FormsTableComponent
    ]
})
export class CeFormsTableModule {}