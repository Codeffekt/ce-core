import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {    
    LayoutService, NavigationBarConfigService
} from '@codeffekt/ce-core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',    
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