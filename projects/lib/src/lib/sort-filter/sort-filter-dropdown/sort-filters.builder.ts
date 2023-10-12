import { FormBlockType, FormInstance, FormQueryFieldType, FormQuerySortField, FormRoot, FormUtils } from "@codeffekt/ce-core-data";

export interface FormQuerySortFieldWithLabel extends FormQuerySortField {
    label: string;
}

export class SortFiltersBuilder {

    static META_SORT_FILTERS: FormQuerySortFieldWithLabel[] = [
        {
            type: "timestamp",
            field: "ctime",
            onMeta: true,
            label: "Date de création",
        },
        {
            type: "timestamp",
            field: "mtime",
            onMeta: true,
            label: "Date de modification"
        },
        {
            type: "text",
            field: "id",
            onMeta: true,
            label: "Id"
        },
        {
            type: "text",
            field: "author",
            onMeta: true,
            label: "Auteur"
        },
        {
            type: "text",
            field: "title",
            onMeta: true,
            label: "Titre"
        },
        {
            type: "text",
            field: "root",
            onMeta: true,
            label: "Modèle de formulaire"
        }
    ];

    private model: FormRoot;
    
    withModel(model: FormRoot) {
        this.model = model;
        return this;
    }

    build(): FormQuerySortFieldWithLabel[] {

        const sortFields = [...SortFiltersBuilder.META_SORT_FILTERS];

        if (this.model) {
            const blocks = FormUtils.getBlocks(<FormInstance>this.model)
            const blockQuerySortFields = blocks
                .map(block => {
                    return { field: block.field, label: block.label };
                })
                // .filter(sortField => sortField.type !== undefined);
            sortFields.push(...blockQuerySortFields);
        }

        return sortFields;
    }
}

function getFieldTypeFrom(blockType: FormBlockType): FormQueryFieldType | undefined {
    var mappings: { [field: string]: FormQueryFieldType } = {
        'text': 'text',
        'boolean': 'text',
        'number': 'double',
    }

    return mappings[blockType];
}