import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputAutocompleteItemDefaultComponent } from './form-input-autocomplete-item-default.component';

describe('FormInputAutocompleteItemDefaultComponent', () => {
  let component: FormInputAutocompleteItemDefaultComponent;
  let fixture: ComponentFixture<FormInputAutocompleteItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputAutocompleteItemDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputAutocompleteItemDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
