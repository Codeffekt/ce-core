import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellFactoryComponent } from './table-cell-factory.component';

describe('TableCellFactoryComponent', () => {
  let component: TableCellFactoryComponent;
  let fixture: ComponentFixture<TableCellFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCellFactoryComponent ],      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellFactoryComponent);
    component = fixture.componentInstance;
    component.block = {
      field: 'image',
      type: 'asset'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
