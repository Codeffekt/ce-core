import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardTitleComponent } from './form-title.component';

describe('FormTitleComponent', () => {
  let component: FormCardTitleComponent;
  let fixture: ComponentFixture<FormCardTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCardTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
