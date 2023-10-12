import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LayoutService } from '../../services/layout.service';

@UntilDestroy()
@Component({
  selector: 'ce-navbar-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {

  @HostBinding('class.responsive') isResponsive!: boolean;

  @Input() routerLink!: string[];

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.observeResponsideModeChanges();
  }

  private observeResponsideModeChanges() {
    this.layoutService.observeResponsiveModeChanges()
      .pipe(untilDestroyed(this))
      .subscribe(isResponsive => this.isResponsive = isResponsive)
  }
}

