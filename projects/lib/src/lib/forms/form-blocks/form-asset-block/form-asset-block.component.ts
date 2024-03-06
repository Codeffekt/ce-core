import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssetElt } from '@codeffekt/ce-core-data';
import { PhotoPickerComponent } from '../../form/photo-picker/photo-picker.component';
import { FormBlockComponent } from '../form-block/form-block.component';

@Component({
  selector: 'ce-form-asset-block',
  templateUrl: './form-asset-block.component.html',
  styleUrls: ['./form-asset-block.component.scss']
})
export class FormAssetBlockComponent extends FormBlockComponent<AssetElt> implements OnInit {

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
  }

  onClear() {
    this.value = undefined;
  }

  openMediaPicker() {
    const dialogRef = this.dialog.open(PhotoPickerComponent, {
      width: '90%',
      maxWidth: '1800px',      
    });

    dialogRef.afterClosed().subscribe((assetElt: AssetElt) => {
      if (assetElt) {
        this.value = assetElt
      }
    });
  }
}
