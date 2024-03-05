import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeProjectSelectorComponent } from './project-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { FormProject, FormProjectWrapper } from '@codeffekt/ce-core-data';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ProjectSelectorComponent', () => {
  let component: CeProjectSelectorComponent;
  let fixture: ComponentFixture<CeProjectSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CeProjectSelectorComponent],
      imports: [
        MatIconModule,
        MatTooltipModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeProjectSelectorComponent);
    component = fixture.componentInstance;
    component.project = new FormProjectWrapper({
      id: 'test',
      ctime: Date.now(),
      valid: true,
      root: FormProject.ROOT,
      title: 'test',
      content: {
        name: {
          field: 'name',
          value: 'Project test',
        }
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
