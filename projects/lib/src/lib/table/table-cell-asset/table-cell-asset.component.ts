import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormBlock } from '@codeffekt/ce-core-data';

export interface CeTableCellAssetOptions {
  thumbSize: number;
}

export const CE_TABLE_CELL_ASSET_DEFAULT_OPTIONS = new InjectionToken<CeTableCellAssetOptions>(
  'forms.table.cell.asset',
  {
    providedIn: 'root',
    factory: () => ({
      thumbSize: 128
    })
  }
);

@Component({
  selector: 'lib-table-cell-asset',
  templateUrl: './table-cell-asset.component.html',
  styleUrls: ['./table-cell-asset.component.scss']
})
export class TableCellAssetComponent implements OnInit {

  block!: FormBlock;

  constructor(@Inject(CE_TABLE_CELL_ASSET_DEFAULT_OPTIONS) public readonly options: CeTableCellAssetOptions) { }

  ngOnInit(): void {
  }

}
