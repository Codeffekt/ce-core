import { FormInstance, FormInstanceExt } from "@codeffekt/ce-core-data";

export interface LocalDatabase<T = FormInstance | FormInstanceExt> {
    [table: string]: T;
}