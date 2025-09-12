import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import {    
    CeFormEditorMenuComponent,
    CeFormEditorTopbarComponent,
    CeGridModule,
    LayoutService, NavigationBarConfigService
} from '@codeffekt/ce-core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    imports: [
        MatSidenavModule,
        RouterModule,
        CeGridModule,
        CeFormEditorTopbarComponent,
        CeFormEditorMenuComponent,
    ]
})
export class HomeComponent implements OnInit, AfterViewInit {

    @ViewChild(MatDrawer) drawer!: MatDrawer;    

    constructor(
        private navBarConfig: NavigationBarConfigService,
        private router: Router,
        private layout: LayoutService,        
    ) {
        this.navBarConfig.useAccount = false;        
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.layout.setDrawer(this.drawer);
    }

    goToLogin() {
        this.router.navigate(['login']);
    }    
}