import { Injectable } from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";
import { TableCellDefaultComponent } from "../table-cell-default/table-cell-default.component";

export interface TableCellFactoryComponents {
    [type: string]: any;
}

export interface TableCellFactoryOptions {
    components: TableCellFactoryComponents;
}

@Injectable({ providedIn: 'root' })
export class TableCellStoreService {

    private store: TableCellFactoryOptions = {
        components: {}
    };

    getComponentType<T>(block: FormBlock): any {
        const existingComponent = this.store.components[block.type!];
        return existingComponent ?? TableCellDefaultComponent;
    }

    setComponents(components: TableCellFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

}