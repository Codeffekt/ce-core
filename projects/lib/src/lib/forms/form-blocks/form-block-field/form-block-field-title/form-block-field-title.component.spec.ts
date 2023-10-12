import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockFieldTitleComponent } from './form-block-field-title.component';

describe('FormBlockFieldTitleComponent', () => {
  let component: FormBlockFieldTitleComponent;
  let fixture: ComponentFixture<FormBlockFieldTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBlockFieldTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBlockFieldTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
