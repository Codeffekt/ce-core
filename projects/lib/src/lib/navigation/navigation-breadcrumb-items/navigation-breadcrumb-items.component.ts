import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem, CeBreadcrumbsService, CeFormEditorService, LayoutService } from '../../services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { FormInfo, isFormInfo } from '../../models';
@UntilDestroy()
@Component({
  selector: 'ce-nav-breadcrumb-items',
  templateUrl: './navigation-breadcrumb-items.component.html',
  styleUrls: ['./navigation-breadcrumb-items.component.scss']
})
export class NavigationBreadcrumbItemsComponent implements OnInit {

  items$ = this.breadcrumbService.items$.asObservable();
  activeItem$ = this.breadcrumbService.activeItem$;

  constructor(
    private layoutService: LayoutService,
    private breadcrumbService: CeBreadcrumbsService,       
    private formEditorService: CeFormEditorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.observeResponsiveModeChanges();
  }

  onItemClicked(item: BreadcrumbItem) {
    this.breadcrumbService.setActiveItem(item);
    this.resolveActiveItem(item);
  }

  private observeResponsiveModeChanges() {
    this.layoutService.observeResponsiveModeChanges()
      .pipe(untilDestroyed(this))
      .subscribe(isResponsive => {

        this.items$ = 
        isResponsive ? 
          this.breadcrumbService.itemsUntilActive$.asObservable() :
          this.breadcrumbService.items$.asObservable();

      });
  }

  private resolveActiveItem(item: BreadcrumbItem) {
    //const route = item.data;
    //const data = route.snapshot.data;
    if(isFormInfo(item.data)) { // could be a form info or a form instance      
      const formInfo: FormInfo = item.data;
      // this.formEditorService.getForm(formInfo.form.core.id);
      this.formEditorService.setCurrentFormInfo(formInfo);
    } else {
      // si ce n'est pas un form info alors c'est un élément du breadcrumb
      // qui n'est pas gérable au niveau du form-editor alors
      // on reset le breadcrumb sur cet élément
      this.breadcrumbService.setItems([item]);
      this.router.navigate([item.url]);
    }
  }
}
