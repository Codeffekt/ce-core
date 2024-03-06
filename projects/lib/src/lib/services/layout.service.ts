import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Inject, Injectable } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CeCoreModuleConfig, CE_CORE_CONFIG } from '../ce-core.config';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  title: string;
  responsiveMode = false;
  // change: ReplaySubject<boolean> = new ReplaySubject();

  private sideMenuOpened!: boolean;
  private sideMenuMode!: MatDrawerMode;
  private sideMenuToggled$ = new ReplaySubject<boolean>(1);
  private sideMenuMode$ = new ReplaySubject<MatDrawerMode>(1);
  private drawer!: MatDrawer;

  constructor(
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    @Inject(CE_CORE_CONFIG) private config: CeCoreModuleConfig
  ) {
    this.title = 'no title';
  }
  toggleSideMenu() {

    if (!this.drawer) {
      throw new Error(`Drawer undefined, plz call setDrawer first`);
    }

    this.drawer.toggle();
  }

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
    this.setSideMenuMode(this.drawer.mode);
    this.setSideMenuOpen(this.drawer.opened);
    this.drawer.openedStart.subscribe(_ => this.setSideMenuOpen(true));
    this.drawer.closedStart.subscribe(_ => this.setSideMenuOpen(false));
  }

  setSideMenuOpen(opened: boolean) {
    this.sideMenuOpened = opened;
    this.sideMenuToggled$.next(this.sideMenuOpened);
  }

  setSideMenuMode(mode: MatDrawerMode) {
    this.sideMenuMode = mode;
    this.sideMenuMode$.next(mode);
  }

  sideMenuToggled(): Observable<boolean> {
    return this.sideMenuToggled$;
  }

  sideMenuModeChanges(): Observable<MatDrawerMode> {
    return this.sideMenuMode$;
  }

  showSingleMessage(msg: string, config: MatSnackBarConfig<any> = { duration: 2000 }) {
    this.snackBar.open(msg, undefined, config);
  }

  showErrorMessage(msg: string) {
    this.showSingleMessage(msg, { panelClass: 'error', duration: 5000 });
  }

  getAppVersion() {
    return "v. dev";
  }

  observeResponsiveModeChanges(): Observable<boolean> {
    return this.observeBreakpoints([Breakpoints.XSmall]);
  }

  observeBreakpoints(breakpoints: string[]): Observable<boolean> {
    return this.breakpointObserver
      .observe(breakpoints)
      .pipe(map(result => result.matches))
  }
}
