import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormDescriptionComponent } from './form-description.component';

describe('FormDescriptionComponent', () => {
  let component: CeFormDescriptionComponent;
  let fixture: ComponentFixture<CeFormDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeFormDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeFormDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
