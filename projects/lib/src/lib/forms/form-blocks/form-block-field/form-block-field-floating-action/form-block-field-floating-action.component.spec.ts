import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockFieldFloatingActionComponent } from './form-block-field-floating-action.component';

describe('FormBlockFieldFloatingActionComponent', () => {
  let component: FormBlockFieldFloatingActionComponent;
  let fixture: ComponentFixture<FormBlockFieldFloatingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBlockFieldFloatingActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBlockFieldFloatingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
