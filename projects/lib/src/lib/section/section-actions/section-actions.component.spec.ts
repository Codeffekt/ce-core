import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeSectionActionsComponent } from './section-actions.component';

describe('SectionActionsComponent', () => {
  let component: CeSectionActionsComponent;
  let fixture: ComponentFixture<CeSectionActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeSectionActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeSectionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
