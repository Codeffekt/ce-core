import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssocFactoryComponent } from './project-assoc-factory.component';

describe('ProjectAssocFactoryComponent', () => {
  let component: ProjectAssocFactoryComponent;
  let fixture: ComponentFixture<ProjectAssocFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAssocFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAssocFactoryComponent);
    component = fixture.componentInstance;
    component.block = {
      field: 'test',      
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
