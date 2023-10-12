import {
    AfterViewInit, Component,
    ComponentRef, EventEmitter,
    HostBinding, Input,
    OnInit, Output,
    ViewChild, ViewContainerRef
} from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";
import { IListItemContent } from "./list-item-models";
import { ListItemStoreService } from "./list-item-store.service";

@Component({
    selector: 'ce-list-item-factory',
    templateUrl: './list-item-factory.component.html',
    styleUrls: ['./list-item-factory.component.scss']
})
export class ListItemFactoryComponent<T = any> implements OnInit, AfterViewInit {

    @Input()
    @HostBinding('class.active') active: boolean = false;

    _item: T;
    get item(): T {
        return this._item;
    }

    _block: FormBlock;
    get block(): FormBlock {
        return this._block;
    }

    _type: string;
    get type(): string {
        return this._type;
    }

    @Input() set item(value: T) {
        this._item = value;
        if (this.listItemComponent) {
            this.connectInputItem(this.listItemComponent.instance);
            this.listItemComponent.changeDetectorRef.detectChanges();
        }
    }

    @Input() set block(value: FormBlock) {
        this._block = value;
        if (this.listItemComponent) {
            this.connectInputBlock(this.listItemComponent.instance);
            this.listItemComponent.changeDetectorRef.detectChanges();
        }
    }

    @Input() set type(value: string) {
        this._type = value;
        this.updateComponent();
    }

    @Output() itemChangedEvent = new EventEmitter<boolean>();

    @ViewChild('container', { read: ViewContainerRef }) vcr: ViewContainerRef;

    private listItemComponent: ComponentRef<IListItemContent>;

    constructor(
        private listItemService: ListItemStoreService
    ) { }

    ngAfterViewInit(): void {
        this.updateComponent();
    }

    ngOnInit(): void {
    }

    private updateComponent() {

        if (!this.vcr) {
            return;
        }

        if (this.listItemComponent) {
            this.vcr.remove();
        }

        const componentType = this.listItemService.getComponentType(this.type);
        if (componentType) {
            this.listItemComponent = this.vcr.createComponent(componentType);
            this.connectInputItem(this.listItemComponent.instance);
            this.connectInputBlock(this.listItemComponent.instance);
            this.connectOutputItemChangedEvent(this.listItemComponent.instance);
            this.listItemComponent.changeDetectorRef.detectChanges();
        }
    }

    private connectInputItem(component: IListItemContent) {
        component.item = this.item;
    }

    private connectInputBlock(component: IListItemContent) {
        component.block = this.block;
    }

    private connectOutputItemChangedEvent(component: IListItemContent) {
        if (component.itemChangedEvent) {
            component.itemChangedEvent.subscribe(
                (value) => this.itemChangedEvent.next(value),
                (error) => this.itemChangedEvent.error(error),
                () => this.itemChangedEvent.complete()
            );
        }
    }
}