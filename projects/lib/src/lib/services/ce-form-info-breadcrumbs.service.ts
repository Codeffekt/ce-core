import { Injectable } from "@angular/core";
import { BreadcrumbItem, CeBreadcrumbsService } from "./ce-breadcrumbs.service";
import { FormInfo } from "../models/form-info";
import { FormWrapper } from "@codeffekt/ce-core-data";
import { FormMaskBuilder } from "../forms/form/form-mask.builder";
import { FormWrapperChangeNotifier } from "../models/FormWrapperChangeNotifier";

@Injectable({ providedIn: 'root' })
export class CeFormInfoBreadcrumbsService {

    constructor(
        private bcService: CeBreadcrumbsService,
    ) {
    }

    processFormInfo(form: FormInfo) {

        if (!form) {
            return;
        }

        if (form.isProject) {
            this.bcService.setItems([this.createItemFromFormInfo(form)]);
        } else {
            const items = this.bcService.getLastItems();
            const existingItem = items.find(item => item.id === form.form.core.id);
            if (existingItem) {
                this.bcService.setActiveItem(existingItem);
            } else {
                this.bcService.setItems([
                    ...items,
                    this.createItemFromFormInfo(form)]);
            }
        }

    }

    processFormChanges(changes: FormWrapperChangeNotifier[]) {
        const items = this.bcService.getLastItems();
        const itemChangePairs = changes.map(change => ({
            change,
            item: items.find(item => item.id === change.wrapper.core.id)
        })).filter(pair => pair.item !== undefined);

        for (const itemChangePair of itemChangePairs) {
            const formInfo = itemChangePair!.item!.data;
            this.updateFormInfo(itemChangePair!.item!.data, itemChangePair.change.wrapper);
            itemChangePair!.item!.label = this.resolveLabel(formInfo);
        }
    }

    private updateFormInfo(formInfo: FormInfo, change: FormWrapper) {
        formInfo.form = change;
        formInfo.formMasked = FormMaskBuilder.fromWrapper(
            formInfo.form,
            formInfo.formMask
        );
    }

    private resolveLabel(formInfo: FormInfo) {
        return formInfo.formMasked?.getFormTitle() ?? formInfo.form.getFormTitle();
    }

    private createItemFromFormInfo(form: FormInfo): BreadcrumbItem {
        return {
            id: form.form.core.id,
            label: this.resolveLabel(form),
            data: form,
            url: form.form.core.id
        }
    }
}