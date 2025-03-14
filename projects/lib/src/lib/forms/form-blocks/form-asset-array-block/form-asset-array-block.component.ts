import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBlockComponent } from '../form-block/form-block.component';
import { AssetElt, IndexType } from '@codeffekt/ce-core-data';
import { CeFormQueryService } from '../../../services/ce-form-query.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LayoutService } from '../../../services/layout.service';
import { CeAssetsService } from '../../../services/ce-assets.service';
import { AssetsFormQueryBuilder } from '../../forms-query/assets-query.builder';
import { firstValueFrom, Observable } from 'rxjs';
import { CeLayoutModule } from '../../../layout';
import {
  FormBlockFieldActionsComponent,
  FormBlockFieldComponent, FormBlockFieldContentComponent
} from '../form-block-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AssetImportComponent, AssetImportConfig } from '../../../media/asset-import/asset-import.component';
import { CeMediaModule } from '../../../media';
import { CePaginatorModule } from '../../../paginator';
import { CeNgReallyModule } from '../../../widgets/ng-really/ng-really.module';
import { AssetsArrayDatasource } from '../../form-datasource/assets-array-datasource';

@Component({
    selector: 'lib-form-asset-array-block',
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        CeLayoutModule,
        CeMediaModule,
        CePaginatorModule,
        CeNgReallyModule,
        FormBlockFieldComponent,
        FormBlockFieldActionsComponent,
        FormBlockFieldContentComponent,
    ],
    templateUrl: './form-asset-array-block.component.html',
    styleUrls: ['./form-asset-array-block.component.scss'],
    providers: [
        CeFormQueryService,
    ]
})
export class FormAssetArrayBlockComponent extends FormBlockComponent<void> implements OnInit {

  datasource!: AssetsArrayDatasource;
  assetArrayRef!: IndexType;
  assets$!: Observable<readonly AssetElt[]>;

  constructor(
    private dialog: MatDialog,
    private layout: LayoutService,
    private readonly queryService: CeFormQueryService<AssetElt>,
    private readonly assetsService: CeAssetsService,
  ) {
    super();
    this.datasource = new AssetsArrayDatasource(this.assetsService);
    this.queryService.setDatasource(this.datasource);
  }

  ngOnInit(): void {
    this.prepareQueryService();
  }

  openAssetImporter() {

    const config: AssetImportConfig = {
      pid: this.formBlock.value,
      formId: this.formInstance.id,
      field: this.formBlock.field,
      title: "Importer un asset"
    };

    const dialogRef = this.dialog.open(
      AssetImportComponent, {
      width: "800px",
      data: config
    });

    dialogRef.afterClosed().subscribe(_ => {
      if (config.isDone && config.asset) {
        this.queryService.load();
      }
    });

  }

  async delete(photo: AssetElt) {
    try {
      await firstValueFrom(this.assetsService.deleteAssetsArray(
        this.formInstance.id,
        this.formBlock.field, [photo.id]
      ));
      this.layout.showSingleMessage('Media supprimé avec succès');
      this.queryService.load();
    } catch (err) {
      this.layout.showErrorMessage(`Erreur <${(<any> err).message}> lors de la suppression du media`);
    }
  }

  private async prepareQueryService() {
    this.datasource.setAssetsArray(this.formInstance.id, this.formBlock.field);
    this.queryService.setQueryBuilder(AssetsFormQueryBuilder.create());
    this.assets$ = this.queryService.connect();
    this.queryService.load();
  }
}
