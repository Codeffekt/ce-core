import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'ce-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class CeGridComponent implements AfterViewInit {

  @Input() gap?: string;
  @Input() grid?: string;
  @Input() rowGap?: string;
  @Input() columnGap?: string;
  @Input() template?: string;
  @Input() autoFlow?: string;
  @Input() autoRows?: string;
  @Input() autoColums?: string;
  @Input() templateAreas?: string;
  @Input() templateRows?: string;
  @Input() templateColumns?: string;
  @Input() alignItems?: string;
  @Input() justifyContent?: string;
  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.applyStyle();
  }

  private applyStyle() {
    this.elementRef.nativeElement.style.gap = this.gap;
    this.elementRef.nativeElement.style.grid = this.grid;
    this.elementRef.nativeElement.style.rowGap = this.rowGap;
    this.elementRef.nativeElement.style.columnGap = this.columnGap;
    this.elementRef.nativeElement.style.gridTemplate = this.template;
    this.elementRef.nativeElement.style.gridAutoFlow = this.autoFlow;
    this.elementRef.nativeElement.style.gridAutoRows = this.autoRows;
    this.elementRef.nativeElement.style.gridAutoColumns = this.autoColums;
    this.elementRef.nativeElement.style.gridTemplateAreas = this.templateAreas;
    this.elementRef.nativeElement.style.gridTemplateRows = this.templateRows;
    this.elementRef.nativeElement.style.gridTemplateColumns = this.templateColumns;
    this.elementRef.nativeElement.style.alignItems = this.alignItems;
    this.elementRef.nativeElement.style.justifyContent = this.justifyContent;
  }
}


