import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectBlockComponent } from './form-select-block.component';

describe('FormSelectBlockComponent', () => {
  let component: FormSelectBlockComponent;
  let fixture: ComponentFixture<FormSelectBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormSelectBlockComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
