import { Injectable } from "@angular/core";
import { CeCoreService } from "./ce-core.service";
import { distinct, filter, mergeMap, Observable, share } from "rxjs";
import { FormEvent, IndexType } from "@codeffekt/ce-core-data";
import { CeFormEditorService } from "./ce-form-editor.service";

@Injectable({ providedIn: 'root'})
export class CeEventsService {

    constructor(
        private coreService: CeCoreService, 
        private formEditorService: CeFormEditorService,       
    ) { }

    all() {
        const eventSource = this.coreService.getEventSource(() => `${this.coreService.getEvents()}/all`);        
        return new Observable<FormEvent>(observer => {            
            eventSource.addEventListener('message', (event: MessageEvent) => {                
                const messageData = JSON.parse(event.data) as FormEvent;
                observer.next(messageData);
            });

            eventSource.onerror = () => {                
                observer.error();
            }
        }).pipe(
            share()
        );
    }

    onFormUpdate(elt: IndexType) {
        return this.all().pipe(
            filter(evt => evt.type === "update" && evt.elts.includes(elt)),
            distinct(evt => evt.time),
            mergeMap(_ => this.formEditorService.getForm(elt, { forceReload: true })),
            distinct((form) => form.form.core.mtime),            
        );
    }
}