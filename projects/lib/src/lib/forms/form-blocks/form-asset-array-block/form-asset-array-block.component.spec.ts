import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssetArrayBlockComponent } from './form-asset-array-block.component';

describe('FormAssetArrayBlockComponent', () => {
  let component: FormAssetArrayBlockComponent;
  let fixture: ComponentFixture<FormAssetArrayBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormAssetArrayBlockComponent]
    });
    fixture = TestBed.createComponent(FormAssetArrayBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
