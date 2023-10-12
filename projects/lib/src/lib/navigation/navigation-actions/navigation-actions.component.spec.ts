import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationActionsComponent } from './navigation-actions.component';

describe('NavigationActionsComponent', () => {
  let component: NavigationActionsComponent;
  let fixture: ComponentFixture<NavigationActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
