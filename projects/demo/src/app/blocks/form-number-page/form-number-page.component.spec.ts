import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNumberPageComponent } from './form-number-page.component';

describe('FormNumberPageComponent', () => {
  let component: FormNumberPageComponent;
  let fixture: ComponentFixture<FormNumberPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNumberPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNumberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
