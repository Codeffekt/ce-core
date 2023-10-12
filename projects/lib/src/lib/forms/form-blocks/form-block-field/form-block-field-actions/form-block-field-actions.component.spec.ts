import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockFieldActionsComponent } from './form-block-field-actions.component';

describe('FormBlockFieldActionsComponent', () => {
  let component: FormBlockFieldActionsComponent;
  let fixture: ComponentFixture<FormBlockFieldActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBlockFieldActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBlockFieldActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
