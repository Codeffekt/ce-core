import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationItemFactoryComponent } from './navigation-item-factory.component';

describe('NavigationItemFactoryComponent', () => {
  let component: NavigationItemFactoryComponent;
  let fixture: ComponentFixture<NavigationItemFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationItemFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationItemFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
