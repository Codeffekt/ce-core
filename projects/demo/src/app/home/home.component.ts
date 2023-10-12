import { Component } from '@angular/core';
import { NavigationBarConfigService } from '@codeffekt/ce-core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent {

    constructor(private navBarConfig: NavigationBarConfigService) {
        this.navBarConfig.useAccount = false;
    }

}