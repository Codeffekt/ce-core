import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormHintComponent } from './form-hint.component';

describe('FormHintComponent', () => {
  let component: CeFormHintComponent;
  let fixture: ComponentFixture<CeFormHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeFormHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeFormHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
