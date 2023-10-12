import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputAutocompleteComponent } from './form-input-autocomplete.component';

describe('FormInputAutocompleteComponent', () => {
  let component: FormInputAutocompleteComponent;
  let fixture: ComponentFixture<FormInputAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
