import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssocNavComponent } from './project-assoc-nav.component';

describe('ProjectAssocNavComponent', () => {
  let component: ProjectAssocNavComponent;
  let fixture: ComponentFixture<ProjectAssocNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAssocNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAssocNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
