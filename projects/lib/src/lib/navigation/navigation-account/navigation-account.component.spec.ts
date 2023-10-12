import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationAccountComponent } from './navigation-account.component';

describe('NavigationAccountComponent', () => {
  let component: NavigationAccountComponent;
  let fixture: ComponentFixture<NavigationAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
