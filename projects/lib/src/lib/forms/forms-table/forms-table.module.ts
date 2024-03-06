import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
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