import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationItemDefaultComponent } from './navigation-item-default.component';

describe('NavigationItemDefaultComponent', () => {
  let component: NavigationItemDefaultComponent;
  let fixture: ComponentFixture<NavigationItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationItemDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationItemDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
