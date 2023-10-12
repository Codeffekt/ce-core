import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardHeaderComponent } from './form-card-header.component';

describe('FormCardHeaderComponent', () => {
  let component: FormCardHeaderComponent;
  let fixture: ComponentFixture<FormCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
