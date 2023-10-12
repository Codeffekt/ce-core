import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[ceAlignItems]' })
export class CeAlignItemsDirective implements AfterViewInit {

    @Input() ceAlignItems?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceAlignItems) {
            this.elementRef.nativeElement.style.alignItems = this.ceAlignItems;
        }
    }
}


@Directive({ selector: '[ceJustifyContent]' })
export class CeJustifyContentDirective implements AfterViewInit {

    @Input() ceJustifyContent?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceJustifyContent) {
            this.elementRef.nativeElement.style.justifyContent = this.ceJustifyContent;
        }
    }
}

@Directive({ selector: '[ceAlignSelf]' })
export class CeAlignSelfContentDirective implements AfterViewInit {

    @Input() ceAlignSelf?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceAlignSelf) {
            this.elementRef.nativeElement.style.alignSelf = this.ceAlignSelf;
        }
    }
}
