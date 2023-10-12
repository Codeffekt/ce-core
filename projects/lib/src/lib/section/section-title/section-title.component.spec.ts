import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeSectionTitleComponent } from './section-title.component';

describe('SectionTitleComponent', () => {
  let component: CeSectionTitleComponent;
  let fixture: ComponentFixture<CeSectionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeSectionTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeSectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
