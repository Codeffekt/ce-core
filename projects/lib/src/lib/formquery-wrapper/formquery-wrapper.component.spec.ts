import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQueryWrapperComponent } from './formquery-wrapper.component';

describe('FormQueryWrapperComponent', () => {
  let component: FormQueryWrapperComponent<any>;
  let fixture: ComponentFixture<FormQueryWrapperComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormQueryWrapperComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQueryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
