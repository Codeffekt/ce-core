import { Injectable, Type } from "@angular/core";
import {
    MediaFactoryComponentClass, MediaFactoryComponentFunction,
    MediaFactoryComponents, MediaFactoryOptions,
    MediaToTypeFunc
} from "./media-models";
import { AssetElt } from "@codeffekt/ce-core-data";

function isFactoryFunction(elt: MediaFactoryComponentClass | MediaFactoryComponentFunction): elt is MediaFactoryComponentFunction {
    return (<MediaFactoryComponentFunction>elt)?.useFunction !== undefined;
}
@Injectable({ providedIn: 'root' })
export class MediaStoreService {

    private defaultComponent!: Type<any>;

    private store: MediaFactoryOptions = {
        components: {}
    };

    private mediaToTypeFuncs: MediaToTypeFunc[] = [];

    getComponentType<T>(asset: AssetElt, elseUseDefault = true): Type<any>|undefined {
        const type = this.getFactoryTypeFromAssetElt(asset);
        const existingComponent = this.store.components[type];

        if (!existingComponent) {
            return elseUseDefault ? this.defaultComponent : undefined;
        }

        return isFactoryFunction(existingComponent) ? existingComponent.useFunction(type) : existingComponent.useClass;
    }

    setComponents(components: MediaFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

    setDefaultComponent(component: Type<any>) {
        this.defaultComponent = component;
    }

    registerMediaToTypeFunc(mttf: MediaToTypeFunc) {
        this.mediaToTypeFuncs.push(mttf);
    }

    private getFactoryTypeFromAssetElt(asset: AssetElt): string {
        const factoryType = asset.mimetype ?? "unknown";
        for(const mediaToTypeFunc of this.mediaToTypeFuncs) {
            const factoryTypeFromFunc = mediaToTypeFunc(asset);
            if(factoryTypeFromFunc !== undefined) {
                return factoryTypeFromFunc;
            }
        }
        return factoryType;
    }
}