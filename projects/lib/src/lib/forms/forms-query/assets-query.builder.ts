import { FormBlock, FormQuery, IndexType } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

const PHOTO_MIMETYPES = ["application/octet-stream", "image/png", "image/jpeg"];

export class AssetsFormQueryBuilder extends FormQueryBuilder {

    private ref: IndexType;

    private constructor() {
        super();
    }

    create(): FormQuery {
        return {
            ...super.create(),            
            ref: this.ref,
        };
    }

    static withPhotoMode() {
        const builder = new AssetsFormQueryBuilder();
        builder.setQueryField({
            field: "mimetype",
            op: "=",
            values: PHOTO_MIMETYPES
        });

        return builder;
    }

    static create() {
        const builder = new AssetsFormQueryBuilder();
        return builder;
    }

    static fromAssetArrayBlock(block: FormBlock) {
        const builder = new AssetsFormQueryBuilder();
        builder.ref = block.value;
        return builder;
    }
}
