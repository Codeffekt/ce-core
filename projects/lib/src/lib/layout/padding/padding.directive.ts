import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[cePadding]' })
export class CePaddingDirective implements AfterViewInit {

    @Input() cePadding?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.cePadding) {
            this.elementRef.nativeElement.style.padding = this.cePadding;
        }
    }
}

@Directive({ selector: '[cePaddingX]' })
export class CeXPaddingDirective implements AfterViewInit {

    @Input() cePaddingX?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.cePaddingX) {
            this.elementRef.nativeElement.style.paddingLeft = this.cePaddingX;
            this.elementRef.nativeElement.style.paddingRight = this.cePaddingX;
        }
    }
}

@Directive({ selector: '[cePaddingY]' })
export class CeYPaddingDirective implements AfterViewInit {

    @Input() cePaddingY?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.cePaddingY) {
            this.elementRef.nativeElement.style.paddingTop = this.cePaddingY;
            this.elementRef.nativeElement.style.paddingBottom = this.cePaddingY;
        }
    }
}

