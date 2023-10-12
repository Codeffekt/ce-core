import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndexPageComponent } from './form-index-page.component';

describe('FormIndexPageComponent', () => {
  let component: FormIndexPageComponent;
  let fixture: ComponentFixture<FormIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIndexPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
