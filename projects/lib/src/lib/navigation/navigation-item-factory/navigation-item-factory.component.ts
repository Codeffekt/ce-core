import {
  AfterViewInit,
  Component, ComponentRef,
  EventEmitter,
  HostBinding, Input,
  OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { INavItemComponent, NavigationItemStoreService } from './navigation-item-store.service';
import { FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'ce-navbar-item-factory',
  templateUrl: './navigation-item-factory.component.html',
  styleUrls: ['./navigation-item-factory.component.scss']
})
export class NavigationItemFactoryComponent<T = any> implements OnInit, AfterViewInit {

  @Input()
  @HostBinding('class.active') active: boolean = false;

  _items: readonly T[];
  get items(): readonly T[] {
    return this._items;
  }

  _formWrapper: FormWrapper;
  get formWrapper(): FormWrapper {
    return this._formWrapper;
  }

  @Input() set items(value: readonly T[]) {
    this._items = value;
    if (this.navItemComponent) {
      this.connectInputItems(this.navItemComponent.instance);
      this.navItemComponent.changeDetectorRef.detectChanges();
    }
  }

  @Input() set formWrapper(value: FormWrapper) {
    if(!this._formWrapper || this._formWrapper !== value) {
      this._formWrapper = value;
      this.updateComponent();
    }    
  }

  @Output() itemChangedEvent = new EventEmitter<boolean>();

  @ViewChild('container', { read: ViewContainerRef }) vcr: ViewContainerRef;

  private navItemComponent: ComponentRef<INavItemComponent>;

  constructor(private navItemService: NavigationItemStoreService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateComponent();
  }

  private updateComponent() {

    if (!this.vcr) {
      return;
    }

    if (this.navItemComponent) {
      this.vcr.remove();
    }

    const componentType = this.navItemService.getComponentType(this.formWrapper);
    if (componentType) {
      this.navItemComponent = this.vcr.createComponent(componentType);
      this.connectInputItems(this.navItemComponent.instance);
      this.connectOutputItemChangedEvent(this.navItemComponent.instance);
      this.navItemComponent.changeDetectorRef.detectChanges();
    }
  }

  private connectInputItems(component: INavItemComponent) {
    component.items = this.items;
  }

  private connectOutputItemChangedEvent(component: INavItemComponent) {
    if (component.itemChangedEvent) {
      component.itemChangedEvent.subscribe(
        (value) => this.itemChangedEvent.next(value),
        (error) => this.itemChangedEvent.error(error),
        () => this.itemChangedEvent.complete()
      );
    }
  }
}
