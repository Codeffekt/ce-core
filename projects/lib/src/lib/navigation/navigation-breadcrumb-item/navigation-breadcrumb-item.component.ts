import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LayoutService } from '../../services/layout.service';

@UntilDestroy()
@Component({
  selector: 'ce-nav-breadcrumb-item',
  templateUrl: './navigation-breadcrumb-item.component.html',
  styleUrls: ['./navigation-breadcrumb-item.component.scss']
})
export class NavigationBreadcrumbItemComponent implements OnInit {

  @HostBinding('class.responsive') isResponsive!: boolean;  

  @Input() active = false;

  constructor(    
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.observeResponsideModeChanges();
  }  

  private observeResponsideModeChanges() {
    this.layoutService.observeResponsiveModeChanges()
      .pipe(untilDestroyed(this))
      .subscribe(isResponsive => this.isResponsive = isResponsive)
  }

}
