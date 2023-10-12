import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'ce-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements AfterViewInit, OnDestroy {

  @Input() gap?: string;

  private _observer!: MutationObserver;

  constructor(private elementRef: ElementRef) {
    this.observeMutation();
  }

  ngAfterViewInit(): void {
    this.applyStyle();
  }

  ngOnDestroy(): void {
    this._observer.disconnect();
  }

  private observeMutation() {
    this._observer = new MutationObserver((mutations) => {
      mutations.forEach((_) => this.applyStyle());
    });
    this._observer.observe(this.elementRef.nativeElement, {
      childList: true,
    });
  }

  private applyStyle() {
    this.applyDefaults();

    if (this.gap) {
      this.applyGap();
    }
  }

  private applyGap() {
    const childrenElts = this.elementRef.nativeElement.children;

    for (let i = 0; i < childrenElts.length - 1; i++) {
      const element = childrenElts[i];
      element.style.marginBottom = this.gap;
    }
  }

  private applyDefaults() {
    const childrenElts = this.elementRef.nativeElement.children;
    for (let i = 0; i < childrenElts.length; i++) {
      const element = childrenElts[i];
      element.style.flexShrink = 0;
      element.style.width = 'auto !default';
    }
  }
}
