import { NgModule } from '@angular/core';
import { CeListNavLinksComponent } from './list-nav-links.component';
import { CeListNavLinkComponent } from './list-nav-link/list-nav-link.component';

@NgModule({
    imports: [
        CeListNavLinksComponent,
        CeListNavLinkComponent
    ],
    exports: [
        CeListNavLinksComponent,
        CeListNavLinkComponent
    ],
    declarations: [],
    providers: [],
})
export class CeListNavLinksModule { }
 