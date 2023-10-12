import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'ce-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnChanges {

  @Input() gap?: string;
  @Input() alignItems?: string;
  @Input() justifyContent?: string;
  @Input() wrap?: string;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyDefaults();

    this.applyStyle();

    if (this.gap) {
      this.applyGap();
    }
  }

  private applyStyle() {
    this.elementRef.nativeElement.style.alignItems = this.alignItems;
    this.elementRef.nativeElement.style.justifyContent = this.justifyContent;
    this.elementRef.nativeElement.style.flexWrap = this.wrap;
  }

  private applyGap() {
    const childrenElts = this.elementRef.nativeElement.children;

    for (let i = 0; i < childrenElts.length; i++) {
      const element = childrenElts[i];
      element.style.marginRight = this.gap;
      element.style.backgroundColor = 'red !important';
    }
  }

  private applyDefaults() {
    const childrenElts = this.elementRef.nativeElement.children;
    for (let i = 0; i < childrenElts.length; i++) {
      const element = childrenElts[i];
      element.style.flexShrink = 0;
      element.style.height = 'auto !default';
    }
  }
}
