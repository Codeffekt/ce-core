import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CeFormComponent } from './form.component';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { CeGridModule } from '../../layout/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CeFormCardModule } from '../form-card/form-card.module';
import { CeFormsPipesModule } from '../../forms-pipes';
import { CeFormBlocksModule } from '../form-blocks';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CeFormComponent', () => {
  let component: CeFormComponent;
  let fixture: ComponentFixture<CeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeFormComponent ],
      imports: [
        NoopAnimationsModule,
        CeGridModule,
        CeFormCardModule,
        CeFormsPipesModule,
        CeFormBlocksModule,
        FormsModule,
        ReactiveFormsModule,        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeFormComponent);
    component = fixture.componentInstance;
    component.formWrapper = FormWrapper.fromForm({
      id: 'test',
      root: 'test-root',
      title: 'test',
      ctime: Date.now(),
      valid: true,
      content: { 
        label: {
          field: "label",
          label: "label",
          type: "text",
          value: "test"
        }       
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 1 card', () => {    
    expect(component.cards.length === 1).toBeTruthy();
  });
});
