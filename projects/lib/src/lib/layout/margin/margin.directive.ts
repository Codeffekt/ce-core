import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[ceMargin]' })
export class CeMarginDirective implements AfterViewInit {

    @Input() ceMargin?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceMargin) {
            this.elementRef.nativeElement.style.margin = this.ceMargin;
        }
    }
}

@Directive({ selector: '[ceMarginX]' })
export class CeXMarginDirective implements AfterViewInit {

    @Input() ceMarginX?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceMarginX) {
            this.elementRef.nativeElement.style.marginLeft = this.ceMarginX;
            this.elementRef.nativeElement.style.marginRight = this.ceMarginX;
        }
    }
}

@Directive({ selector: '[ceMarginY]' })
export class CeYMarginDirective implements AfterViewInit {

    @Input() ceMarginY?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceMarginY) {
            this.elementRef.nativeElement.style.marginTop = this.ceMarginY;
            this.elementRef.nativeElement.style.marginBottom = this.ceMarginY;
        }
    }
}

@Directive({ selector: '[ceMarginEnd]' })
export class CeMarginEndDirective implements AfterViewInit {

    @Input() ceMarginEnd?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceMarginEnd) {
            this.elementRef.nativeElement.style.marginRight = this.ceMarginEnd;
        }
    }
}

@Directive({ selector: '[ceMarginStart]' })
export class CeMarginStartDirective implements AfterViewInit {

    @Input() ceMarginStart?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceMarginStart) {
            this.elementRef.nativeElement.style.marginLeft = this.ceMarginStart;
        }
    }
}


@Directive({ selector: '[ceMarginTop]' })
export class CeMarginTopDirective implements AfterViewInit {

    @Input() ceMarginTop?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceMarginTop) {
            this.elementRef.nativeElement.style.marginTop = this.ceMarginTop;
        }
    }
}



@Directive({ selector: '[ceMarginBottom]' })
export class CeMarginBotttomDirective implements AfterViewInit {

    @Input() ceMarginBottom?: string;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        if (this.ceMarginBottom) {
            this.elementRef.nativeElement.style.marginBottom = this.ceMarginBottom;
        }
    }
}