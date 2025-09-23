import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockFieldInfosComponent } from './form-block-field-infos.component';

describe('FormBlockFieldInfosComponent', () => {
  let component: FormBlockFieldInfosComponent;
  let fixture: ComponentFixture<FormBlockFieldInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBlockFieldInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBlockFieldInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
