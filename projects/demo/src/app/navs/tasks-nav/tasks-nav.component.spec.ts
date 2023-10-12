import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksNavComponent } from './tasks-nav.component';

describe('TasksNavComponent', () => {
  let component: TasksNavComponent;
  let fixture: ComponentFixture<TasksNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
