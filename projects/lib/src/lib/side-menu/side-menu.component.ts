import { Component, Input, OnInit } from '@angular/core';
import { CeAppService } from '../services/ce-app.service';

@Component({
  selector: 'ce-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class CeSideMenuComponent implements OnInit {

  logo: string;
  title: string;

  constructor(
    appService: CeAppService,
  ) {
    this.logo = appService.getAssets().logoPath!;
    this.title = appService.getTitle();
  }

  ngOnInit(): void { }
}

@Component({
  selector: 'ce-side-menu-content',
  template: `<ng-content></ng-content>`,
})
export class CeSideMenuContentComponent { }

@Component({
  selector: 'ce-side-menu-header',
  template: `<ng-content></ng-content>`,
  styles: [':host { display: flex; }']
})
export class CeSideMenuHeaderComponent { }

@Component({
  selector: 'ce-side-menu-footer',
  template: `<ng-content></ng-content>`,
})
export class CeSideMenuFooterComponent { }


@Component({
  selector: 'ce-side-menu-list',
  template: `
    <mat-nav-list (click)="toggleMenu()">
        <ng-content></ng-content>
    </mat-nav-list>`,
})
export class CeSideMenuListComponent {

  @Input() toggleMenuOnClick = false; 

  toggleMenu() {
    if (this.toggleMenuOnClick) {      
    }
  }
}