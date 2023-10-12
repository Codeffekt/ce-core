import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
    selector: '[appIcon]'
})
export class CeFontIconDirective implements OnInit {

    @Input() appIcon!: string;

    constructor(private host: MatIcon, private elementRef: ElementRef) { }

    ngOnInit() {
        if (this.host instanceof MatIcon) {
            this.host.fontSet = 'font_icons';
            this.host.inline = true;
            this.host.fontIcon = this.appIcon;
            this.elementRef.nativeElement.style.fontFamily = "font_icons";
        }
    }
}
