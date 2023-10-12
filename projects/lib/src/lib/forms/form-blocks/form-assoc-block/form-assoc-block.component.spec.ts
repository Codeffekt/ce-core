import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssocBlockComponent } from './form-assoc-block.component';

describe('FormAssocBlockComponent', () => {
  let component: FormAssocBlockComponent;
  let fixture: ComponentFixture<FormAssocBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormAssocBlockComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssocBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
