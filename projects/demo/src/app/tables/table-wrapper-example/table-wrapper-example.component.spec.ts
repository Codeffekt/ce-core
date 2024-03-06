import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableWrapperExampleComponent } from './table-wrapper-example.component';
import { RouterTestingModule } from "@angular/router/testing";
import { CeFormQueryWrapperModule, CeTableModule } from '@codeffekt/ce-core';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableWrapperExampleComponent', () => {
  let component: TableWrapperExampleComponent;
  let fixture: ComponentFixture<TableWrapperExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWrapperExampleComponent ],
      imports: [
        CeFormQueryWrapperModule,
        RouterTestingModule,
        CeTableModule,
        MatTableModule,
        NoopAnimationsModule,
      ]      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWrapperExampleComponent);
    component = fixture.componentInstance;    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
