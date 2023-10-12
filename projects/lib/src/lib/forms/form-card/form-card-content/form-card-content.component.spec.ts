import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardContentComponent } from './form-card-content.component';

describe('FormCardContentComponent', () => {
  let component: FormCardContentComponent;
  let fixture: ComponentFixture<FormCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCardContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
