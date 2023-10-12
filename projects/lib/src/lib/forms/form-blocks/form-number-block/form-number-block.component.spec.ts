import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNumberBlockComponent } from './form-number-block.component';

describe('FormNumberBlockComponent', () => {
  let component: FormNumberBlockComponent;
  let fixture: ComponentFixture<FormNumberBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormNumberBlockComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNumberBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
