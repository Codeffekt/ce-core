import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellAssetComponent } from './table-cell-asset.component';

describe('TableCellAssetComponent', () => {
  let component: TableCellAssetComponent;
  let fixture: ComponentFixture<TableCellAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCellAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
