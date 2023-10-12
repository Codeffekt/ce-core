import { Injectable } from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";
import { FormBlockComponentAccessor } from "../form-block/form-block.component";
import { FormBlockComponentType, FormBlockStoreService } from "./form-block-store.service";

@Injectable({ providedIn: 'root' })
export class FormBlockFactoryService {  

  constructor(private readonly formBlockStore: FormBlockStoreService) { }

  getComponentType<T>(block: FormBlock): FormBlockComponentType<FormBlockComponentAccessor<T>> {
    return this.formBlockStore.getComponentType(block);
  }
  
}