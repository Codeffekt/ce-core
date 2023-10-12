import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBreadcrumbItemComponent } from './navigation-breadcrumb-item.component';

describe('NavigationBreadcrumbItemComponent', () => {
  let component: NavigationBreadcrumbItemComponent;
  let fixture: ComponentFixture<NavigationBreadcrumbItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBreadcrumbItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBreadcrumbItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
