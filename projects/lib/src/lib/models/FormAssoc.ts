import { FormBlock, FormBlockEntity, FormInstance, FormRootEntity, FormUtils, FormWrapper, IndexType } from "@codeffekt/ce-core-data";

@FormRootEntity({ id: FormAssoc.ROOT, title: "Formulaire Assoc" })
export class FormAssoc {

    static readonly ROOT = "forms-assoc";

    @FormBlockEntity({ type: "object" })
    assoc: FormBlock;
}

export class FormAssocBuilder {

    static fromForm(form: FormInstance, assoc: IndexType): FormWrapper {


        const block = FormUtils.getBlockFromField(form, assoc);

        const formWrapper = FormWrapper.fromForm({
            id: block.field,
            ctime: form.ctime,
            root: FormAssoc.ROOT,
            title: block.label,
            valid: true,
            content: {
                assoc: {
                    field: "assoc",
                    type: "object",
                    value: block
                }
            }
        });

        return formWrapper;
    }

}