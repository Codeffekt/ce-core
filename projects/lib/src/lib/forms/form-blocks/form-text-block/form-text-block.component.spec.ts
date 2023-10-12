import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextBlockComponent } from './form-text-block.component';

describe('FormTextBlockComponent', () => {
  let component: FormTextBlockComponent;
  let fixture: ComponentFixture<FormTextBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormTextBlockComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
