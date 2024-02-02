import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetElt, IndexType } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { AssetsDatasource } from '../../form-datasource/assets-datasource';
import { AssetsFormQueryBuilder } from '../../forms-query/assets-query.builder';
import { CeAssetsService } from '../../../services/ce-assets.service';
import { CeCoreService } from '../../../services/ce-core.service';
import { CeFormQueryService } from '../../../services/ce-form-query.service';
import { CeProjectsService } from '../../../services/ce-projects.service';
import { FormQueryBuilder } from '../../forms-query';
import { FormQueryDatasource } from '../../form-datasource';

export interface PhotoPickerConfig {
  pid?: IndexType;
  queryBuilder?: FormQueryBuilder;
  datasource?: FormQueryDatasource<AssetElt>;
}

@Component({
  selector: 'app-photo-picker',
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class PhotoPickerComponent implements OnInit {

  selectedPhoto: AssetElt;
  photos$: Observable<readonly AssetElt[]>;
  datasource!: FormQueryDatasource<AssetElt>;

  private pid: IndexType;

  constructor(
    private readonly queryService: CeFormQueryService<AssetElt>,
    private readonly assetsService: CeAssetsService,
    private projectService: CeProjectsService,
    private coreService: CeCoreService,
    public dialogRef: MatDialogRef<PhotoPickerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PhotoPickerConfig) {
    this.datasource = this.data?.datasource ?? this.createAssetsDatasource();
    this.queryService.setQueryBuilder(
      this.data?.queryBuilder ??
      AssetsFormQueryBuilder.withPhotoMode()
    );
    this.queryService.setDatasource(this.datasource);
    this.photos$ = this.queryService.connect();
  }

  ngOnInit() {
    this.queryService.load();
  }

  onSelectPhoto(photo: AssetElt) {
    if (this.selectedPhoto === photo) {
      this.selectedPhoto = null;
      return;
    }
    this.selectedPhoto = photo;
  }

  onSubmit() {
    this.dialogRef.close(this.selectedPhoto);
  }

  onDismiss(): void {
    this.dialogRef.close();
  }  

  private createAssetsDatasource() {
    const currentProject = this.projectService.getCurrentProjectAssetsRef();
    const currentUser = this.coreService.getCurrentUser();
    this.pid = currentProject ? this.projectService.getCurrentProjectAssetsRef() : currentUser.settings.account;
    const datasource = new AssetsDatasource(this.assetsService);
    datasource.pid = this.pid;
    return datasource;
  }
}
