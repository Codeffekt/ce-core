import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssetBlockComponent } from './form-asset-block.component';

describe('FormAssetBlockComponent', () => {
  let component: FormAssetBlockComponent;
  let fixture: ComponentFixture<FormAssetBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormAssetBlockComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
