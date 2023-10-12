import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[overflow-auto]' })
export class CeOverflowAutoDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.overflow = 'auto'
    }
}

@Directive({ selector: '[overflow-x-auto]' })
export class CeOverflowXAutoDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.overflowX = 'auto'
    }
}