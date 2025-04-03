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
import { AssetsArrayDatasource } from '../../form-datasource';
import { CeAssetsService } from '../../../services';
import { AssetsFormQueryBuilder } from '../../forms-query';
import { FormInfo } from '../../../models/form-info';
import { AssetImportComponent, AssetImportConfig } from '../../../media/asset-import/asset-import.component';
import { SpaceFormContextService } from '../../../spaces';

@Component({
  selector: 'ce-form-asset-block',
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

  assetsForm?: FormInfo

  private dialog = inject(MatDialog);
  private spaceContextService = inject(SpaceFormContextService);
  private assetsService = inject(CeAssetsService);

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
    this.initAssetsForm();
  }

  onClear() {
    this.value = undefined as any;
  }

  delete(asset: AssetElt) {
  }

  openMediaPicker() {

    if (!this.assetsForm || !this.formBlock.index) {
      return;
    }

    const datasource = new AssetsArrayDatasource(this.assetsService);
    datasource.setAssetsArray(this.assetsForm.form.core.id, this.formBlock.index);

    const dialogRef = PhotoPickerComponent.open(this.dialog, {
      datasource,
      queryBuilder: AssetsFormQueryBuilder.create(),
    });

    dialogRef.afterClosed().subscribe((assetElt: AssetElt) => {
      if (assetElt) {
        this.value = assetElt
      }
    });
  }

  openAssetImporter() {

    if(!this.assetsForm || !this.formBlock.index) {
      return;
    }

    const config: AssetImportConfig = {
      pid: this.assetsForm.form.core.id,
      formId: this.assetsForm.form.core.id,
      field: this.formBlock.index,
      title: "Importer un asset"
    };

    const dialogRef = this.dialog.open(
      AssetImportComponent, {
      width: "800px",
      data: config
    });

    dialogRef.afterClosed().subscribe(_ => {
      if (config.isDone && config.asset) {
        this.value = config.asset;
      }
    });

  }

  private initAssetsForm() {

    this.assetsForm = undefined;

    if (!this.formBlock.index || !this.formBlock.root) {
      return;
    }

    this.assetsForm = this.spaceContextService.findFormFromRoot(this.formBlock.root!);
  }
}
