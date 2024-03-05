import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { CeLayoutModule } from '../../layout';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { NameOrAccountPipe } from './account-dialog/account.pipes';
import { NavigationAccountComponent } from './navigation-account.component';

@NgModule({
    imports: [
        CeLayoutModule,
        OverlayModule,
        MatButtonModule,
        MatIconModule,
        CommonModule
    ],
    exports: [
        NavigationAccountComponent
    ],
    declarations: [
        NavigationAccountComponent,
        AccountDialogComponent,
        NameOrAccountPipe
    ],
    providers: [],
})
export class CeNavigationAccountModule { }
