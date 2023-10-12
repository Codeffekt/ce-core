import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { PaginatorComponent } from "./paginator.component";

@NgModule({
    declarations: [
        PaginatorComponent
    ],
    imports: [
        MatPaginatorModule
    ],
    exports: [
        PaginatorComponent
    ]
})
export class CePaginatorModule {}