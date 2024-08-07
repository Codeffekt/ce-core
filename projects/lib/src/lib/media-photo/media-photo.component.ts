import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetElt } from '@codeffekt/ce-core-data';
import { IMediaContent } from '../media/media-factory/media-models';

@Component({
  selector: 'ce-media-photo',
  templateUrl: './media-photo.component.html',
  styleUrls: ['./media-photo.component.scss']
})
export class MediaPhotoComponent implements IMediaContent, OnInit {

  @Input() mode: 'view' | 'edit' = 'edit';
  @Input() enableLink = true;
  @Input() elt: AssetElt;
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
