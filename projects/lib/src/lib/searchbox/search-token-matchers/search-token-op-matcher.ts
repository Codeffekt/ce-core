import { FormQueryFieldOp } from "@codeffekt/ce-core-data";

export const SEARCH_POSSIBLED_OPS: FormQueryFieldOp[] = ['<', '>', '=', '~~*'];

export class SearchTokenOpMatcher {
    match(value: string): string | undefined {
        if (SEARCH_POSSIBLED_OPS.findIndex(op => op === value) != -1) {
            return value;
        }

        return undefined;
    }
}
