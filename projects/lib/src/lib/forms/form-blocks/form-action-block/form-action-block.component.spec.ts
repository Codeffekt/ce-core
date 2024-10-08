import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActionBlockComponent } from './form-action-block.component';

describe('FormActionBlockComponent', () => {
  let component: FormActionBlockComponent;
  let fixture: ComponentFixture<FormActionBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormActionBlockComponent]
    });
    fixture = TestBed.createComponent(FormActionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
