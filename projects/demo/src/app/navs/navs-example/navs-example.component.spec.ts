import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsExampleComponent } from './navs-example.component';

describe('NavsExampleComponent', () => {
  let component: NavsExampleComponent;
  let fixture: ComponentFixture<NavsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavsExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
