import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextPageComponent } from './form-text-page.component';

describe('FormTextPageComponent', () => {
  let component: FormTextPageComponent;
  let fixture: ComponentFixture<FormTextPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTextPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
