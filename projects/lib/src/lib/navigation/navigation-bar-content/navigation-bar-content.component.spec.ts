import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarContentComponent } from './navigation-bar-content.component';

describe('NavigationBarContentComponent', () => {
  let component: NavigationBarContentComponent;
  let fixture: ComponentFixture<NavigationBarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
