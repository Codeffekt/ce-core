import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormsPresentationComponent } from './ce-forms-presentation.component';

describe('CeFormsPresentationComponent', () => {
  let component: CeFormsPresentationComponent;
  let fixture: ComponentFixture<CeFormsPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeFormsPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeFormsPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
