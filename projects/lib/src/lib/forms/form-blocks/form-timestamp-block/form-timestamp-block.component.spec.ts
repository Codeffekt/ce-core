import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTimestampBlockComponent } from './form-timestamp-block.component';

describe('FormTimestampBlockComponent', () => {
  let component: FormTimestampBlockComponent;
  let fixture: ComponentFixture<FormTimestampBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormTimestampBlockComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTimestampBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
