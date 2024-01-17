import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsUserSharedComponent } from './projects-user-shared.component';

describe('ProjectsUserSharedComponent', () => {
  let component: ProjectsUserSharedComponent;
  let fixture: ComponentFixture<ProjectsUserSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsUserSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsUserSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
