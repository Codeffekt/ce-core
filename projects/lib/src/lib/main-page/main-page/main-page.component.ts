import { MediaMatcher } from '@angular/cdk/layout';
import { Portal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CeNavBarService, CeSideMenuService, LayoutService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [
    LayoutService
  ]
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatDrawer) drawer!: MatDrawer;
  sideMenuportal$!: Observable<Portal<any> | undefined>;
  navBarPortal$!: Observable<Portal<any> | undefined>;

  mobileQuery!: MediaQueryList;

  private _mobileQueryListener!: () => void;

  constructor(
    private layout: LayoutService,
    private menuService: CeSideMenuService,
    private navBarService: CeNavBarService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,    
  ) {    
    this.listenMobileQuery();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.sideMenuportal$ = this.menuService.getPortal();
      this.navBarPortal$ = this.navBarService.getPortal();
    });    
  }

  ngAfterViewInit() {
    this.layout.setDrawer(this.drawer);
  }

  ngOnDestroy(): void {
    this.removeMobileQuery();
  }

  private listenMobileQuery() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  private removeMobileQuery() {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }  
}
