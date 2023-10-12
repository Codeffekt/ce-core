import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { CeFormEvent } from "../models/form-event";
import { FormWrapperChangeNotifier } from "../models/FormWrapperChangeNotifier";

/**
 * This service manages forms updates
 * in any part of the application. Could be
 * used by components that displays
 * sub forms data such as `FormIndexBlockComponent` blocks.
 * The `CeFormEditor` uses this service to forward updates.
 */
@Injectable({
    providedIn: 'root'
})
export class CeFormsChangesService {

    changes: ReplaySubject<FormWrapperChangeNotifier[]> = new ReplaySubject(1);
    
    events: ReplaySubject<CeFormEvent> = new ReplaySubject(1);

    constructor() {}

    onFormChanges() {
        return this.changes;
    }
}