import { AfterViewInit, Component, ComponentRef, HostBinding, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBlock } from '@codeffekt/ce-core-data';
import { TableCellStoreService } from './table-cell-store.service';

@Component({
  selector: 'ce-table-cell-factory',
  templateUrl: './table-cell-factory.component.html',
  styleUrls: ['./table-cell-factory.component.scss']
})
export class TableCellFactoryComponent implements OnInit, AfterViewInit {

  @Input()
  @HostBinding('class.active') active: boolean = false;

  @Input() block!: FormBlock;

  @ViewChild('container', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  private tableCellComponent!: ComponentRef<any>;

  constructor(private cellStoreService: TableCellStoreService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const componentType = this.cellStoreService.getComponentType(this.block);
    if (componentType) {
      this.tableCellComponent = this.vcr.createComponent(componentType);
      this.tableCellComponent.instance.block = this.block;
      this.tableCellComponent.changeDetectorRef.detectChanges();
    }
  }
}
