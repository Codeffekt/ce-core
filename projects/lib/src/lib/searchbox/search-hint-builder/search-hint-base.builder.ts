import { FormBlock, FormBlockType, FormInstance, FormRoot, FormUtils } from "@codeffekt/ce-core-data";
import { SearchHint, SearchHintsContext } from "../model/search-hint";

export const META_FIELD_OP = "$";

export const FORMROOT_META: FormRoot = {
    id: undefined as any,
    ctime: undefined as any,
    title: undefined as any,
    content: {
        author: {
            field: "author",
            type: "index",
            label: "Auteur"
        },
        id: {
            field: "id",
            type: "index",
            label: "Identifiant"
        },
        root: {
            field: "root",
            type: "index",
            label: "Modèle"
        },
        ctime: {
            field: "ctime",
            type: "timestamp",
            label: "Date de création"
        },
        mtime: {
            field: "mtime",
            type: "timestamp",
            label: "Date de modification"
        },
        title: {
            field: "title",
            type: "text",
            label: "Titre"
        },
        valid: {
            field: "valid",
            type: "boolean",
            label: "Valide"
        }
    }
}

export abstract class SearchHintBaseBuilder {

    protected context!: SearchHintsContext;

    withContext(context: SearchHintsContext): SearchHintBaseBuilder {
        this.context = context;
        return this;
    }

    build(): SearchHint[] {
        var hints = this.getHints();
        return this.filterHints(this.filter, hints);
    }

    getHintFromValue(value: string): SearchHint | undefined {
        return this.getHints().find(hint => hint.value.toString() == value);
    }

    abstract getHints(): SearchHint[];

    protected get field(): string {
        return this.context!.token!.field!.value;
    }

    protected get model(): FormRoot {
        return this.context.model;
    }

    protected get filter(): string {
        return this.context.filter;
    }

    protected get block(): FormBlock | null {
        if (!this.context) {
            return null;
        }
        return this.context.block as any;
    }

    protected get fieldType(): FormBlockType | null{
        return this.block?.type as any;
    }

    protected filterHints(filter: string, hints: SearchHint[]): SearchHint[] {
        return hints.filter(hint =>
            !filter ||
            hint.label?.toLowerCase().includes(filter) ||
            hint.value.toString().toLowerCase().includes(filter) ||
            hint.description?.toLowerCase().includes(filter));
    }
}