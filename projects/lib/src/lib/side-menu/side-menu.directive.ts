import { DomPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { CeSideMenuService } from '../services/ce-side-menu.service';

@Directive({
    selector: '[ceSideMenu]'
})
export class CeSideMenuDirective implements OnDestroy {

    private portal: DomPortal;

    constructor(
        el: ElementRef,
        menuService: CeSideMenuService,
    ) {        
        this.portal = new DomPortal(el);
        menuService.setModalPortal(this.portal);
    }

    ngOnDestroy(): void {
        if (this.portal.isAttached) {
            this.portal.detach();
        }
    }
}