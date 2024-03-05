import { NgModule } from "@angular/core";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
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