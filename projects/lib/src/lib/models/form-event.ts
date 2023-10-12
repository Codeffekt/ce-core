import { IndexType } from "@codeffekt/ce-core-data";

export type CeFormEventAction = 'update'|'remove'|'copy'|'create';

export interface CeFormEvent {
    action: CeFormEventAction;
    root: IndexType;
    id?: IndexType;
}