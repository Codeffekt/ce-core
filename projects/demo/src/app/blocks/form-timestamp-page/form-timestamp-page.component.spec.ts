import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTimestampPageComponent } from './form-timestamp-page.component';

describe('FormTimestampPageComponent', () => {
  let component: FormTimestampPageComponent;
  let fixture: ComponentFixture<FormTimestampPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTimestampPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTimestampPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
