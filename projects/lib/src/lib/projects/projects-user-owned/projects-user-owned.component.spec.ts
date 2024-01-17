import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsUserOwnedComponent } from './projects-user-owned.component';

describe('ProjectsUserOwnedComponent', () => {
  let component: ProjectsUserOwnedComponent;
  let fixture: ComponentFixture<ProjectsUserOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsUserOwnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsUserOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
