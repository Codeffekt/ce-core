import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetElt } from '@codeffekt/ce-core-data';
import { IMediaContent } from '../media/media-factory/media-models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CePipesModule } from '../pipes/pipes.module';
import { CeNgReallyModule } from '../widgets/ng-really';

@Component({
  selector: 'ce-media-photo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CePipesModule,
    CeNgReallyModule,
  ],
  templateUrl: './media-photo.component.html',
  styleUrls: ['./media-photo.component.scss']
})
export class MediaPhotoComponent implements IMediaContent, OnInit {

  @Input() mode: 'view' | 'edit' = 'edit';
  @Input() enableLink = true;
  @Input() elt!: AssetElt;
  @Output() delete: EventEmitter<AssetElt> = new EventEmitter();

  hasImgError = false;

  constructor() { }

  ngOnInit(): void { }

  doDelete() {
    this.delete.next(this.elt);
  }

  onImageError() {
    this.hasImgError = true;
  }
}
