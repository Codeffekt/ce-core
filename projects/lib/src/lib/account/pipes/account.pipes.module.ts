import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountLoginPipe } from './account-login.pipe';
import { AccountFromLoginPipe } from './account-from-login.pipe';
import { AccountIdentityLabelPipe } from './account-display-identity.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AccountLoginPipe,
        AccountFromLoginPipe,
        AccountIdentityLabelPipe
    ],
    declarations: [
        AccountLoginPipe,
        AccountFromLoginPipe,
        AccountIdentityLabelPipe
    ],
    providers: [],
})
export class CeCoreAccountPipesModule { }
