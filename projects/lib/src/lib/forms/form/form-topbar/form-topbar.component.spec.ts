import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTopbarComponent } from './form-topbar.component';

describe('FormTopbarComponent', () => {
  let component: FormTopbarComponent;
  let fixture: ComponentFixture<FormTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTopbarComponent]
    });
    fixture = TestBed.createComponent(FormTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
