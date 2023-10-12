import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfigSelectComponent } from './app-config-select.component';

describe('AppConfigSelectComponent', () => {
  let component: AppConfigSelectComponent;
  let fixture: ComponentFixture<AppConfigSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppConfigSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConfigSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
