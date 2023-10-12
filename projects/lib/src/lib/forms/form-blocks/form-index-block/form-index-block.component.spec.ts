import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndexBlockComponent } from './form-index-block.component';

describe('FormIndexBlockComponent', () => {
  let component: FormIndexBlockComponent;
  let fixture: ComponentFixture<FormIndexBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormIndexBlockComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIndexBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
