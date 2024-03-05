import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CeSectionContentComponent } from './section-content.component';

describe('CeSectionContentComponent', () => {
  let component: CeSectionContentComponent;
  let fixture: ComponentFixture<CeSectionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeSectionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeSectionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
