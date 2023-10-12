import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { FormProjectWrapper } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LayoutService } from '../../services/layout.service';
import { NavigationBarConfigService } from './navigation-bar-config.service';

@UntilDestroy()
@Component({
  selector: 'ce-navbar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements OnInit {

  @Input() darkMode = true;
  @Input() transparent = false;
  @Input() label!: string;
  @Input() position: 'above' | 'over' = 'above';
  @Input() useToggleSideMenu = true;

  @HostBinding('class.above') get isPositioningAbove() { return this.position === 'above'; }
  @HostBinding('class.over') get isPositioningOver() { return this.position === 'over'; }
  @HostBinding('class.transparent') get isBackgroundTransparent() { return this.transparent; }

  project!: FormProjectWrapper;
  sideMenuOpened!: boolean;
  sideMenuMode!: MatDrawerMode;  

  constructor(
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    public navBarConfig: NavigationBarConfigService,
  ) { }

  ngOnInit(): void {
    this.observeProjectChanges();
    this.observeSideMenuModeChanges();
    this.observeSideMenuStateChanges();
  }

  toggleSideMenu() {
    this.layoutService.toggleSideMenu();
  }

  get canShowProjectName(): boolean {
    return !!this.project && (this.sideMenuMode === 'over' || !this.sideMenuOpened);
  }

  private observeProjectChanges() {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        this.project = data.project,
          this.cdr.detectChanges();
      });
  }

  private observeSideMenuStateChanges() {
    this.layoutService.sideMenuToggled()
      .pipe(untilDestroyed(this))
      .subscribe(sideMenuOpened => {
        this.sideMenuOpened = sideMenuOpened;
        this.cdr.detectChanges();
      });
  }

  private observeSideMenuModeChanges() {
    this.layoutService.sideMenuModeChanges()
      .pipe(untilDestroyed(this))
      .subscribe(sideMenuMode => {
        this.sideMenuMode = sideMenuMode;
        this.cdr.detectChanges();
      })
  }
}

