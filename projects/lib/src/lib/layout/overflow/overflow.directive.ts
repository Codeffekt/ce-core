import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[overflow-auto]',
    standalone: false
})
export class CeOverflowAutoDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.overflow = 'auto'
    }
}

@Directive({
    selector: '[overflow-x-auto]',
    standalone: false
})
export class CeOverflowXAutoDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.overflowX = 'auto'
    }
}