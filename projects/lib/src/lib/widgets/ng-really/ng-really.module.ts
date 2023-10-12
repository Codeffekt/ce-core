import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgReallyClickDirective } from './ng-really-click.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";

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