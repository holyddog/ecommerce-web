import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: "tree-menu",
    templateUrl: './tree-menu.element.html',
    styleUrls: ['./tree-menu.element.css']
})
export class TreeMenuElement {
    @Input('data') items: any[];
    @Input('child') child: string;
}