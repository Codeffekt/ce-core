import { Portal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CeSideMenuService {

    private portal$ = new BehaviorSubject<Portal<any>|undefined>(undefined);

    getPortal() {
        return this.portal$;
    }

    setModalPortal(portal: Portal<any>) {
        this.portal$.next(portal);
    }
}