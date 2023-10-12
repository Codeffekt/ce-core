import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockFieldContentComponent } from './form-block-field-content.component';

describe('FormBlockFieldContentComponent', () => {
  let component: FormBlockFieldContentComponent;
  let fixture: ComponentFixture<FormBlockFieldContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBlockFieldContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBlockFieldContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
