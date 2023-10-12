import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBarcodePageComponent } from './form-barcode-page.component';

describe('FormBarcodePageComponent', () => {
  let component: FormBarcodePageComponent;
  let fixture: ComponentFixture<FormBarcodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBarcodePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBarcodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
