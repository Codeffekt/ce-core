import { AfterViewInit, Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: '[gridRowStart],[gridColumnStart],[gridRowEnd],[gridColumnEnd]'
})
export class GridStartEndDirective implements AfterViewInit {

  @Input() gridRowStart?: string;
  @Input() gridRowEnd?: string;
  @Input() gridColumnStart?: string;
  @Input() gridColumnEnd?: string;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.gridRowStart = this.gridRowStart ?? 'inherit';
    this.elementRef.nativeElement.style.gridRowEnd = this.gridRowEnd ?? 'inherit';
    this.elementRef.nativeElement.style.gridColumnStart = this.gridColumnStart ?? 'inherit';
    this.elementRef.nativeElement.style.gridColumnEnd = this.gridColumnEnd ?? 'inherit';
  }
}

@Directive({ selector: '[gridColumn]' })
export class GridColumnDirective implements OnInit {

  @Input() gridColumn?: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.gridColumn = this.gridColumn ?? 'inherit';
  }
}