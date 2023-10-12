import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectPageComponent } from './form-select-page.component';

describe('FormSelectPageComponent', () => {
  let component: FormSelectPageComponent;
  let fixture: ComponentFixture<FormSelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSelectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
