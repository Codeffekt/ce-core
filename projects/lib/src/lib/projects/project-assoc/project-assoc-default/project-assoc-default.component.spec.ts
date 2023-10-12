import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssocDefaultComponent } from './project-assoc-default.component';

describe('ProjectAssocDefaultComponent', () => {
  let component: ProjectAssocDefaultComponent;
  let fixture: ComponentFixture<ProjectAssocDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAssocDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAssocDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
