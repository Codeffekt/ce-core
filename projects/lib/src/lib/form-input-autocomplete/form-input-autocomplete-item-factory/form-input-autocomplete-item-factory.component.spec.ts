import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputAutocompleteItemFactoryComponent } from './form-input-autocomplete-item-factory.component';

describe('FormInputAutocompleteItemFactoryComponent', () => {
  let component: FormInputAutocompleteItemFactoryComponent;
  let fixture: ComponentFixture<FormInputAutocompleteItemFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputAutocompleteItemFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputAutocompleteItemFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
