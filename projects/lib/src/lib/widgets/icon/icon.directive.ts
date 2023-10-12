import { Directive, ElementRef, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[iconSize]'
})
export class IconSizeDirective {
  @Input() iconSize?: string;

  constructor(private host: MatIcon, private elementRef: ElementRef) { }

  ngOnInit() {

    if (this.host instanceof MatIcon) {

      if (this.iconSize) {
        this.elementRef.nativeElement.style.width = this.iconSize;
        this.elementRef.nativeElement.style.height = this.iconSize;
        this.elementRef.nativeElement.style.fontSize = this.iconSize;
        this.elementRef.nativeElement.style.lineHeight = this.iconSize;
      }
    }
  }

}
