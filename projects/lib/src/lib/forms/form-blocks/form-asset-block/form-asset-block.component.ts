import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AssetElt } from '@codeffekt/ce-core-data';
import { PhotoPickerComponent } from '../../form/photo-picker/photo-picker.component';
import { FormBlockComponent } from '../form-block/form-block.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CeNgReallyModule } from '../../../widgets/ng-really';
import { CeMediaModule } from '../../../media/media.module';
import { SpaceFormPathService } from '../../../spaces/space-form-path.service';
import { AssetsDatasource } from '../../form-datasource';
import { CeAssetsService } from '../../../services';
import { AssetsFormQueryBuilder } from '../../forms-query';

@Component({
  selector: 'ce-form-asset-block',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CeNgReallyModule,
    CeMediaModule,
  ],
  templateUrl: './form-asset-block.component.html',
  styleUrls: ['./form-asset-block.component.scss']
})
export class FormAssetBlockComponent extends FormBlockComponent<AssetElt> implements OnInit {

  private dialog = inject(MatDialog);
  private spacePathService = inject(SpaceFormPathService);
  private assetsService = inject(CeAssetsService);

  constructor(    
  ) {
    super();
  }

  ngOnInit(): void {
  }

  onClear() {
    this.value = undefined as any;
  }

  delete(asset: AssetElt) {
  }

  openMediaPicker() {
    if(!this.formBlock.index) {
      return;
    }

    const dialogRef = PhotoPickerComponent.open(this.dialog, {
        datasource: new AssetsDatasource(this.assetsService),
        queryBuilder: AssetsFormQueryBuilder.fromAssetArrayBlock(
          this.spacePathService.findBlock(this.formBlock.root!, this.formBlock.index)
        )
    });

    dialogRef.afterClosed().subscribe((assetElt: AssetElt) => {
      if (assetElt) {
        this.value = assetElt
      }
    });
  }
}
