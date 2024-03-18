import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CeLayoutModule } from '../../layout/layout.module';
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
