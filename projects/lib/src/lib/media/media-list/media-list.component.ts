import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AssetElt, IndexType } from '@codeffekt/ce-core-data';
import { AssetImportComponent, AssetImportConfig } from '../asset-import/asset-import.component';
import { CeFormQueryService } from '../../services/ce-form-query.service';
import { AssetsDatasource } from '../../forms/form-datasource/assets-datasource';
import { LayoutService } from '../../services/layout.service';
import { CeAssetsService } from '../../services/ce-assets.service';
import { AssetsFormQueryBuilder } from '../../forms/forms-query/assets-query.builder';

const ASSETS_DEFAULT_REF = "default";

@Component({
  selector: 'ce-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class MediaListComponent implements OnInit {

  datasource!: AssetsDatasource;
  photos$: Observable<readonly AssetElt[]>;

  @Input() pid: IndexType;

  private ref: IndexType;

  constructor(
    public dialog: MatDialog,
    private layout: LayoutService,
    private readonly queryService: CeFormQueryService<AssetElt>,
    private readonly assetsService: CeAssetsService,    
  ) {    
    this.datasource = new AssetsDatasource(this.assetsService);            
    this.queryService.setDatasource(this.datasource);    
  }

  ngOnInit() {   
    this.ref= this.pid ?? ASSETS_DEFAULT_REF;    
    this.prepareQueryService();
  }

  async delete(photo: AssetElt) {
    try {
      await firstValueFrom(this.assetsService.deleteAssets(this.ref, [photo.id]));
      this.layout.showSingleMessage('Media supprimé avec succès');
      this.queryService.load();
    } catch (err) {
      this.layout.showErrorMessage(`Erreur <${err.message}> lors de la suppression du media`);
    }
  }

  openPhotoImport() {

    const config: AssetImportConfig = {
      pid: this.ref,
      title: "Importer un media"
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

  private async prepareQueryService() {
    this.queryService.setQueryBuilder(AssetsFormQueryBuilder.create());
    this.photos$ = this.queryService.connect();
    this.queryService.load();
  }

}
