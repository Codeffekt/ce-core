import { FormBlock, FormInstanceMaskWrapper, FormWrapper } from "@codeffekt/ce-core-data";

export function isFormInfo(elt: FormInfo | unknown): elt is FormInfo {
    return (elt as FormInfo)?.form !== undefined;
}

export interface FormInfo {
    form: FormWrapper;
    formMask: FormInstanceMaskWrapper;
    formMasked?: FormWrapper;
    block?: FormBlock; // optional parent block for subforms
    isProject?: boolean;
}
