import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetElt } from '@codeffekt/ce-core-data';

@Component({
  selector: 'ce-media-default',
  templateUrl: './media-default.component.html',
  styleUrls: ['./media-default.component.scss']
})
export class MediaDefaultComponent implements OnInit {

  @Input() mode: 'view' | 'edit' = 'edit';
  @Input() enableLink = true;
  @Input() elt: AssetElt;
  @Output() delete: EventEmitter<AssetElt> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  doDelete() {
    this.delete.next(this.elt);
  }
}
