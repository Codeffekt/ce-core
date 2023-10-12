import { AfterViewInit, Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { CeFormInputAutocompleteStoreService } from '../form-input-autocomplete-store.service';
import { IFormAutocompleteItemContent } from '../form-input-item-models';

@Component({
  selector: 'ce-form-input-autocomplete-item-factory',
  templateUrl: './form-input-autocomplete-item-factory.component.html',
  styleUrls: ['./form-input-autocomplete-item-factory.component.css']
})
export class FormInputAutocompleteItemFactoryComponent<T = any> implements AfterViewInit {

  @ViewChild('container', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  _type!: string;

  _item!: T;


  @Input() set type(value: string) {
    this._type = value;
    this.updateComponent();
  }

  @Input() set item(value: T) {
    this._item = value;
    if (this.listItemComponent) {
      this.connectInputItem(this.listItemComponent.instance);
      this.listItemComponent.changeDetectorRef.detectChanges();
    }
  }

  private listItemComponent!: ComponentRef<IFormAutocompleteItemContent>;

  constructor(private store: CeFormInputAutocompleteStoreService) { }

  ngAfterViewInit(): void {
    this.updateComponent();
  }

  get type(): string {
    return this._type;
  }

  get item(): T {
    return this._item;
  }

  private updateComponent() {

    if (!this.vcr) {
      return;
    }

    if (this.listItemComponent) {
      this.vcr.remove();
    }

    const componentType = this.store.getComponentType(this.type);

    if (componentType) {
      this.listItemComponent = this.vcr.createComponent(componentType);
      this.connectInputItem(this.listItemComponent.instance);
      this.listItemComponent.changeDetectorRef.detectChanges();
    }
  }

  private connectInputItem(component: IFormAutocompleteItemContent) {
    component.item = this.item;
  }
}
