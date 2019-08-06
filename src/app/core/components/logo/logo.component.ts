import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {


    @Input() url = 'assets/logo/logo-light-icon.png';
    @Input() name = 'UberEats';
    @Input() sub = 'Admin';
    @Input() link = '/';

    @Input() showText = true;
    @Input() showImg = true;

    highlight = false;
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    open() {

    }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.highlight = true;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.highlight = false;
    }

    ngOnInit() {
    }

}
