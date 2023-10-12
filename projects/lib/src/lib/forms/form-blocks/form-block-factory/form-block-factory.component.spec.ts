import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockFactoryComponent } from './form-block-factory.component';

describe('FormBlockFactoryComponent', () => {
  let component: FormBlockFactoryComponent;
  let fixture: ComponentFixture<FormBlockFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormBlockFactoryComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBlockFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
