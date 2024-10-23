import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AssetElt } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { CeFormQueryService } from '../../../services/ce-form-query.service';
import { FormQueryBuilder } from '../../forms-query';
import { FormQueryDatasource } from '../../form-datasource';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CePaginatorModule } from '../../../paginator';
import { CeMediaModule } from '../../../media/media.module';

export interface PhotoPickerConfig {
  queryBuilder: FormQueryBuilder;
  datasource: FormQueryDatasource<AssetElt>;
}

@Component({
  selector: 'app-photo-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CePaginatorModule,
    CeMediaModule,
  ],
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class PhotoPickerComponent implements OnInit {


  static open(dialog: MatDialog, config: PhotoPickerConfig) {
    return dialog.open(PhotoPickerComponent, { data: config });
  }

  selectedPhoto!: AssetElt;
  photos$: Observable<readonly AssetElt[]>;
  datasource!: FormQueryDatasource<AssetElt>;

  constructor(
    private readonly queryService: CeFormQueryService<AssetElt>,
    public dialogRef: MatDialogRef<PhotoPickerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PhotoPickerConfig) {
    this.datasource = this.data.datasource;
    this.queryService.setQueryBuilder(
      this.data.queryBuilder
    );
    this.queryService.setDatasource(this.datasource);
    this.photos$ = this.queryService.connect();
  }

  ngOnInit() {
    this.queryService.load();
  }

  onSelectPhoto(photo: AssetElt) {
    if (this.selectedPhoto === photo) {
      this.selectedPhoto = null as any;
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

}
