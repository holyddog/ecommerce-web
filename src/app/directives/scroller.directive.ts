import { Directive, HostBinding, EventEmitter, HostListener, Input, Output, Inject } from '@angular/core';

declare var $: any;

@Directive({
    selector: '[scroller]'
})
export class ScrollerDirective {
    @Output() scrollend = new EventEmitter<any>();

    @HostListener('scroll', ['$event']) onWindowScroll(event) {
        let raw = event.srcElement;
        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
            this.scrollend.emit();
        }
    }
}