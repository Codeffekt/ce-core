import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgReallyClickDirective } from './ng-really-click.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        NgReallyClickDirective,
        ConfirmationDialogComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
    ],
    exports: [
        NgReallyClickDirective,
        ConfirmationDialogComponent,
    ]
})
export class CeNgReallyModule { }