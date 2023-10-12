import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBooleanBlockComponent } from './form-boolean-block.component';

describe('FormBooleanBlockComponent', () => {
  let component: FormBooleanBlockComponent;
  let fixture: ComponentFixture<FormBooleanBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormBooleanBlockComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBooleanBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
