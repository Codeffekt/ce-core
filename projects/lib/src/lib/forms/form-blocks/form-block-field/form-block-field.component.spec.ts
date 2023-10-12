import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockFieldComponent } from './form-block-field.component';

describe('FormBlockFieldComponent', () => {
  let component: FormBlockFieldComponent;
  let fixture: ComponentFixture<FormBlockFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBlockFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBlockFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
