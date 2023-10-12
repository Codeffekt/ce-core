import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockFieldHeaderComponent } from './form-block-field-header.component';

describe('FormBlockFieldHeaderComponent', () => {
  let component: FormBlockFieldHeaderComponent;
  let fixture: ComponentFixture<FormBlockFieldHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBlockFieldHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBlockFieldHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
