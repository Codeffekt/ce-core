import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgReallyClickDirective } from './ng-really-click.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";

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