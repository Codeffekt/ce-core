import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[rowFill]'
})
export class RowFillDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.flex = '1 1 auto';
    }
}