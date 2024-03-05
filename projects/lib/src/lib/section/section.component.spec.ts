import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CeSectionComponent } from './section.component';

describe('CeSectionComponent', () => {
  let component: CeSectionComponent;
  let fixture: ComponentFixture<CeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
