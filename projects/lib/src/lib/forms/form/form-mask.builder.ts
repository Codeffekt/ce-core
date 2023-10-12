import {
    FormBlock, FormInstance,
    FormInstanceMaskWrapper, FormUtils, FormWrapper
} from "@codeffekt/ce-core-data";

interface FormContent {
    [field: string]: FormBlock;
}

export class FormMaskBuilder {

    /**
     * Apply a mask and remove disabled blocks of a form 
     * @param form 
     * @param mask 
     * @returns A copy of the original form
     */
    build(form: FormInstance, mask?: FormInstanceMaskWrapper): FormInstance {
        
        const haveMask = mask?.props?.mask !== undefined && !mask.props.disabled;
        const formMask = haveMask ? mask.props.mask : undefined;        

        return {
            ...form,
            ...formMask,
            content: FormUtils.getBlocks(form)
                .map((block: FormBlock) => ({ ...block, ...formMask?.content[block.field] }))
                .filter((block: FormBlock) => !block.disabled)
                .reduce((content: FormContent, block: FormBlock) => ({
                    ...content,
                    [block.field]: block
                }), {})
        };
    }

    static fromForm(form: FormInstance, mask?: FormInstanceMaskWrapper): FormInstance {
        const builder = new FormMaskBuilder();
        return builder.build(form, mask);
    }

    static fromWrapper(wrapper: FormWrapper, mask?: FormInstanceMaskWrapper): FormWrapper {
        const builder = new FormMaskBuilder();
        const formMasked = builder.build(wrapper.core, mask);
        return FormWrapper.fromForm(formMasked);
    }    
}