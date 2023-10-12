import { FormQueryBuilder } from "./formquery.builder";

const PHOTO_MIMETYPES = ["application/octet-stream", "image/png", "image/jpeg"];

export class AssetsFormQueryBuilder extends FormQueryBuilder {

    constructor() {
        super();
    }

    withPhotoMode() {
        this.setQueryField({
            field: "mimetype",
            op: "=",
            values: PHOTO_MIMETYPES
        });

        return this;
    }
}
