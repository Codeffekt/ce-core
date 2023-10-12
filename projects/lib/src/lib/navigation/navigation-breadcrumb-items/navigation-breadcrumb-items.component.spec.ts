import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBreadcrumbItemsComponent } from './navigation-breadcrumb-items.component';

describe('NavigationBreadcrumbItemsComponent', () => {
  let component: NavigationBreadcrumbItemsComponent;
  let fixture: ComponentFixture<NavigationBreadcrumbItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBreadcrumbItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBreadcrumbItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
