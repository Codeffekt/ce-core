import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFactoryBlockComponent } from './form-factory-block.component';

describe('FormFactoryBlockComponent', () => {
  let component: FormFactoryBlockComponent;
  let fixture: ComponentFixture<FormFactoryBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormFactoryBlockComponent]
    });
    fixture = TestBed.createComponent(FormFactoryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
