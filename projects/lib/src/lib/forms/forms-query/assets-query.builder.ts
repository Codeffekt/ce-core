import { FormQueryBuilder } from "./formquery.builder";

const PHOTO_MIMETYPES = ["application/octet-stream", "image/png", "image/jpeg"];

export class AssetsFormQueryBuilder extends FormQueryBuilder {

    private constructor() {
        super();
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
}
