import { NgModule } from "@angular/core";
import { NgReallyClickDirective } from './ng-really-click.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({    
    imports: [        
        NgReallyClickDirective,
        ConfirmationDialogComponent,
    ],
    exports: [
        NgReallyClickDirective,
        ConfirmationDialogComponent,
    ]
})
export class CeNgReallyModule { }