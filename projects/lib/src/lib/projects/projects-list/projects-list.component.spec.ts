import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeProjectsListComponent } from './projects-list.component';

describe('ProjectsListComponent', () => {
  let component: CeProjectsListComponent;
  let fixture: ComponentFixture<CeProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeProjectsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
