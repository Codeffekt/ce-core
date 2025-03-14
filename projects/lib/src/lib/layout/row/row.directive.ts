import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[rowFill]',
    standalone: false
})
export class RowFillDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.flex = '1 1 auto';
    }
}