import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockAssetFactoryComponent } from './form-block-asset-factory.component';

describe('FormBlockAssetFactoryComponent', () => {
  let component: FormBlockAssetFactoryComponent;
  let fixture: ComponentFixture<FormBlockAssetFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBlockAssetFactoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBlockAssetFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
