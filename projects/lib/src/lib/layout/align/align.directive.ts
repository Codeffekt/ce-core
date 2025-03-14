import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[ceAlignItems]',
    standalone: false
})
export class CeAlignItemsDirective implements AfterViewInit {

    @Input() ceAlignItems?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceAlignItems) {
            this.elementRef.nativeElement.style.alignItems = this.ceAlignItems;
        }
    }
}


@Directive({
    selector: '[ceJustifyContent]',
    standalone: false
})
export class CeJustifyContentDirective implements AfterViewInit {

    @Input() ceJustifyContent?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceJustifyContent) {
            this.elementRef.nativeElement.style.justifyContent = this.ceJustifyContent;
        }
    }
}

@Directive({
    selector: '[ceAlignSelf]',
    standalone: false
})
export class CeAlignSelfContentDirective implements AfterViewInit {

    @Input() ceAlignSelf?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceAlignSelf) {
            this.elementRef.nativeElement.style.alignSelf = this.ceAlignSelf;
        }
    }
}
