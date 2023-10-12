import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetElt } from '@codeffekt/ce-core-data';

@Component({
  selector: 'ce-media-photo',
  templateUrl: './media-photo.component.html',
  styleUrls: ['./media-photo.component.scss']
})
export class MediaPhotoComponent implements OnInit {

  @Input() mode: 'view' | 'edit' = 'edit';
  @Input() enableLink = true;
  @Input() photo: AssetElt;
  @Output() delete: EventEmitter<AssetElt> = new EventEmitter();

  hasImgError = false;

  constructor() { }

  ngOnInit(): void { }

  doDelete() {
    this.delete.next(this.photo);
  }

  onImageError() {
    this.hasImgError = true;
  }
}
