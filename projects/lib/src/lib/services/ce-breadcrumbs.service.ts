import { Injectable } from "@angular/core";
import { IndexType } from "@codeffekt/ce-core-data";
import { ReplaySubject } from "rxjs";

export interface BreadcrumbItem<T = any> {
    label: string;
    url: string;
    id: IndexType;
    data: T;
}

@Injectable({ providedIn: 'root' })
export class CeBreadcrumbsService<T = any> {

    items$: ReplaySubject<BreadcrumbItem<T>[]> = new ReplaySubject(1);
    itemsUntilActive$: ReplaySubject<BreadcrumbItem<T>[]> = new ReplaySubject(1);
    activeItem$: ReplaySubject<BreadcrumbItem | undefined> = new ReplaySubject(1);

    _lastItems: BreadcrumbItem[] = [];
    _lastActiveItem: BreadcrumbItem | undefined;

    constructor() { }

    setItems(bcItems: BreadcrumbItem<T>[]) {
        this._lastItems = bcItems;
        this.items$.next(bcItems);
        this.setActiveLastItem();
    }

    getLastItems() {
        return this._lastItems;
    }

    getLastActiveItem() {
        return this._lastActiveItem;
    }

    setActiveItem(item: BreadcrumbItem) {
        this._lastActiveItem = item;
        this.activeItem$.next(item);
        const activeItemIndex = this._lastItems.indexOf(this._lastActiveItem);
        this.itemsUntilActive$.next(
            activeItemIndex === -1 ? [] : this._lastItems.slice(0, activeItemIndex + 1)
        );
    }

    private setActiveLastItem(options: { silent: boolean } = { silent: false }) {
        if (!this._lastItems.length) {
            return;
        }
        this.setActiveItem(this._lastItems[this._lastItems.length - 1]);
    }
}