import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeProjectSelectorComponent } from './project-selector.component';

describe('ProjectSelectorComponent', () => {
  let component: CeProjectSelectorComponent;
  let fixture: ComponentFixture<CeProjectSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeProjectSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeProjectSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
