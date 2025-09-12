import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
    imports: [
        RouterModule,
        RouterOutlet,
    ]
})
export class AppComponent {  

}
