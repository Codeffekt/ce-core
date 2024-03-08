import { FormInstance, FormInstanceExt } from "@codeffekt/ce-core-data";

export interface LocalDatabase {
    [table: string]: FormInstance | FormInstanceExt;
}