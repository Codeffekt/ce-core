import {
  AfterViewInit, Component,
  ComponentRef, EventEmitter, HostBinding,
  Input, OnInit,
  Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { AssetElt } from '@codeffekt/ce-core-data';
import { IMediaContent } from './media-models';
import { MediaStoreService } from './media-store.service';

@Component({
  selector: 'ce-media-factory',
  templateUrl: './media-factory.component.html',
  styleUrls: ['./media-factory.component.scss']
})
export class MediaFactoryComponent implements OnInit, AfterViewInit {

  @Input()
  @HostBinding('class.active') active: boolean = false;
  @Output() delete: EventEmitter<AssetElt> = new EventEmitter();

  _elt!: AssetElt;
  get elt(): AssetElt {
    return this._elt;
  }

  _type!: string;
  get type(): string {
    return this._type;
  }

  @Input() set elt(value: AssetElt) {
    this._elt = value;
    if (this.mediaComponent) {
      this.connectInputItem(this.mediaComponent.instance);
      this.mediaComponent.changeDetectorRef.detectChanges();
    }
  }

  @Input() set type(value: string) {
    this._type = value;
    this.updateComponent();
  }

  @ViewChild('container', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  private mediaComponent!: ComponentRef<IMediaContent>;

  constructor(
    private mediaStoreService: MediaStoreService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateComponent();
  }

  private updateComponent() {

    if (!this.vcr) {
      return;
    }

    if (this.mediaComponent) {
      this.vcr.remove();
    }

    const componentType = this.mediaStoreService.getComponentType(this.elt);
    if (componentType) {
      this.mediaComponent = this.vcr.createComponent(componentType);
      this.connectInputItem(this.mediaComponent.instance);
      this.connectOutputDeleteEvent(this.mediaComponent.instance);
      this.mediaComponent.changeDetectorRef.detectChanges();
    }
  }

  private connectInputItem(component: IMediaContent) {
    component.elt = this.elt;
  }

  private connectOutputDeleteEvent(component: IMediaContent) {
    if (component.delete) {
      component.delete.subscribe(
        (value) => this.delete.next(value),
        (error) => this.delete.error(error),
        () => this.delete.complete()
      );
    }
  }
}
