import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubformTitleComponent } from './form-subform-title.component';

describe('FormSubformTitleComponent', () => {
  let component: FormSubformTitleComponent;
  let fixture: ComponentFixture<FormSubformTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubformTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubformTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
