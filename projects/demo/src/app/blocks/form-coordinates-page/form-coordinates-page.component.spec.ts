import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoordinatesPageComponent } from './form-coordinates-page.component';

describe('FormCoordinatesPageComponent', () => {
  let component: FormCoordinatesPageComponent;
  let fixture: ComponentFixture<FormCoordinatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCoordinatesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCoordinatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
