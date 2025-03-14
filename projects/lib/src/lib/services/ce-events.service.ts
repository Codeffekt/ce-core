import { Injectable } from "@angular/core";
import { CeCoreService } from "./ce-core.service";
import { distinct, filter, mergeMap, Subject } from "rxjs";
import { FormEvent, IndexType } from "@codeffekt/ce-core-data";
import { CeFormEditorService } from "./ce-form-editor.service";

@Injectable({ providedIn: 'root'})
export class CeEventsService {

    private sseEvents$ = new Subject<FormEvent>();    
    private eventSource?: EventSource;

    constructor(
        private coreService: CeCoreService, 
        private formEditorService: CeFormEditorService,       
    ) { }

    listen() {
        if(this.eventSource) {
            return;
        }

        this.eventSource = this.coreService.getEventSource(() => `${this.coreService.getEvents()}/all`);

        this.eventSource.addEventListener('init', (event: MessageEvent) => {
            console.log("Event source init", event.data);
        });

        this.eventSource.addEventListener('message', (event: MessageEvent) => {                
            const messageData = JSON.parse(event.data) as FormEvent;
            this.sseEvents$.next(messageData);
        });

        this.eventSource.onerror = () => {
            console.log("Event source error close connection");
            this.close();
        }
    }

    close() {

        if(!this.eventSource) {
            return;
        }

        this.eventSource.close();
        this.eventSource = undefined;
    }

    all() {

        this.listen();

        return this.sseEvents$.asObservable();
    }

    onFormUpdate(elt: IndexType) {
        return this.all().pipe(
            filter(evt => evt.type === "update" && (<any> evt.elts).includes(elt)),
            distinct(evt => evt.time),
            mergeMap(_ => this.formEditorService.getForm(elt, { forceReload: true })),            
            distinct((form) => form.form.core.mtime),            
        );
    }
}