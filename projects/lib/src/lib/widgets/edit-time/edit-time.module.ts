import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { CeLayoutModule } from "../../layout";
import { CeIconModule } from "../icon";
import { EditTimeComponent } from "./edit-time.component";
import { CeEllapsedTimePipe } from "./ellapsed-time.pipe";

@NgModule({
    declarations: [
        EditTimeComponent,
        CeEllapsedTimePipe
    ],
    imports: [
        CommonModule,
        MatIconModule,
        CeIconModule,
        CeLayoutModule
    ],
    exports: [
        EditTimeComponent
    ]
})
export class CeEditTimeModule { }