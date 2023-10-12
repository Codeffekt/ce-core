import { DomPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { CeNavBarService } from '../../services/ce-navbar.service';

@Directive({
    selector: '[ceNavBar]'
})
export class CeNavigationBarDirective implements OnDestroy {

    private portal: DomPortal;

    constructor(
        el: ElementRef,
        navBarService: CeNavBarService,
    ) {
        this.portal = new DomPortal(el);
        navBarService.setModalPortal(this.portal);
    }

    ngOnDestroy(): void {
        if (this.portal.isAttached) {
            this.portal.detach();
        }
    }
}