import {animate, state, style, transition, trigger} from '@angular/animations';
import {ChangeDetectorRef, Component, HostListener, Input, OnInit} from '@angular/core';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';


export enum GoTopListener {
    UNDEFINED = 'undefined',
    DEFAULT = 'window',
    PERFECT_SCROLLBAR = 'perfect-scrollbar',
}

const CLASSNAME = 'go-top-button';

@Component({
    selector: 'app-go-top-button',
    templateUrl: './go-top-button.component.html',
    styleUrls: ['./go-top-button.component.scss'],
    animations: [
        trigger('appearInOut', [
            state('in', style({
                // opacity: 0.85
            })),
            state('out', style({
                // opacity: 0.5
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
    ],
})
export class GoTopButtonComponent implements OnInit {

    /**
     * Go top button scroller
     */
    @Input() psScroller: PerfectScrollbarComponent = null;

    /**
     * Go top button will appear when user scrolls Y to this position
     */
    @Input() scrollDistance: number;
    /**
     * User styles config object
     */
    @Input() styles: any;
    /**
     * Classes to be applied to the button
     */
    @Input() classNames: string;
    /**
     * If true scrolling to top will be animated
     */
    @Input() animate: boolean;
    /**
     * Animated scrolling speed
     */
    @Input() speed: number;
    /**
     * Acceleration coefficient, added to speed when using animated scroll
     */
    @Input() acceleration: number;
    /**
     * Button tabIndex HTML attribute
     */
    @Input() tabIndex: number;


    animationState: string;

    private timerID;


    constructor() {
        this.animationState = 'out';
        this.timerID = null;
        /**
         * Go top button will appear when user scrolls Y to this position
         */
        this.scrollDistance = 200;
        /**
         * User styles config object
         */
        this.styles = {};
        /**
         * Classes to be applied to the button
         */
        this.classNames = null;
        /**
         * If true scrolling to top will be animated
         */
        this.animate = false;
        /**
         * Animated scrolling speed
         */
        this.speed = 80;
        /**
         * Acceleration coefficient, multiple to speed when using animated scroll
         */
        this.acceleration = 1;
        /**
         * Button tabIndex HTML attribute
         */
        this.tabIndex = 0;
    }

    ngOnInit() {
        this.validateInputs();
        // Listens to scroller component scroll and animates the button
        if (this.havePsScroller()) {
            this.psScroller.psScrollY.subscribe(value => {
                this.onPerfectScrollbarScroll();
            });
        }

    }

    onPerfectScrollbarScroll() {
        this.animationState = this.getCurrentScrollTop(GoTopListener.PERFECT_SCROLLBAR) > this.scrollDistance ? 'in' : 'out';
    }

    forceUpdateComponent(ref: ChangeDetectorRef = null) {
        if (ref != null) {
            ref.detectChanges();
        }
    }

    /**
     * Listens to window scroll and animates the button
     */
    @HostListener('window:scroll')
    onWindowScroll() {
        if (this.isBrowser()) {
            this.animationState = this.getCurrentScrollTop(GoTopListener.DEFAULT) > this.scrollDistance ? 'in' : 'out';
        }
    }

    /**
     * Scrolls to top
     */
    scrollTop(event) {
        event.preventDefault();
        if (this.animate) {
            this.animateScrollTop();
            return;
        }

        if (this.havePsScroller()) {
            this.psScroller.directiveRef.scrollToTop();
        }

        if (this.isBrowser()) {
            window.scrollTo(0, 0);
        }

    }

    /**
     * Performs the animated scroll to top
     */
    animateScrollTop() {
        if (this.timerID !== null) {
            return;
        }
        let initialSpeed = this.speed;
        const that = this;
        this.timerID = setInterval(
            (
                function () {

                    initialSpeed *= that.acceleration;
                    if (that.havePsScroller()) {
                        that.psScroller.directiveRef.scrollTo(0, 0, initialSpeed);
                    }
                    if (that.isBrowser()) {
                        window.scrollBy(0, -initialSpeed);
                    }
                    if ((that.getCurrentScrollTop(GoTopListener.DEFAULT) === 0)
                        && (that.getCurrentScrollTop(GoTopListener.PERFECT_SCROLLBAR) === 0)
                    ) {
                        clearInterval(that.timerID);
                        that.timerID = null;
                    }
                }
            ),
            15
        );
    }

    /**
     * Get current Y scroll position
     */
    getCurrentScrollTop(listener: GoTopListener = GoTopListener.UNDEFINED) {
        if ((listener === GoTopListener.DEFAULT) && this.isBrowser()) {
            if (typeof window.scrollY !== 'undefined' && window.scrollY >= 0) {
                return window.scrollY;
            }
            if (typeof window.pageYOffset !== 'undefined' && window.pageYOffset >= 0) {
                return window.pageYOffset;
            }
            if (typeof document.body.scrollTop !== 'undefined' && document.body.scrollTop >= 0) {
                return document.body.scrollTop;
            }
            if (typeof document.documentElement.scrollTop !== 'undefined' && document.documentElement.scrollTop >= 0) {
                return document.documentElement.scrollTop;
            }
        }
        if ((listener === GoTopListener.PERFECT_SCROLLBAR) && this.havePsScroller()) {
            return this.psScroller.directiveRef.position(true).y;
        }
        if ((listener === GoTopListener.UNDEFINED)) {
            const topBroswer = this.getCurrentScrollTop(GoTopListener.DEFAULT);
            const topPsScroller = this.getCurrentScrollTop(GoTopListener.PERFECT_SCROLLBAR);
            return Math.max(topBroswer, topPsScroller);
        }
        return 0;
    }

    /**
     * Get button style
     */
    getStyles() {
        return this.styles || {};
    }

    getClasses() {
        if (this.classNames != null) {
            return CLASSNAME + ' ' + this.classNames;
        }
        return CLASSNAME;
    }

    isHidden() {
        return (this.animationState === 'out');
    }

    /**
     * This check will prevent 'window' logic to be executed
     * while executing the server rendering
     */
    isBrowser() {
        return typeof (window) !== 'undefined';
    }

    havePsScroller() {
        return (this.psScroller !== null) && (this.psScroller.directiveRef !== null);
    }

    private validateInputs() {
        const errorMessagePrefix = 'GoTopButton component input validation error: ';
        if (this.scrollDistance < 0) {
            throw Error(errorMessagePrefix + '\'scrollDistance\' parameter must be greater or equal to 0');
        }
        if (this.speed < 1) {
            throw Error(errorMessagePrefix + '\'speed\' parameter must be a positive number');
        }
        if (this.acceleration < 0) {
            throw Error(errorMessagePrefix + '\'acceleration\' parameter must be greater or equal to 0');
        }
        if (this.classNames != null && typeof this.classNames !== 'string') {
            throw Error(errorMessagePrefix + '\'classNames\' parameter must be a string like \'class1 class2 class3\'');
        }
        if (this.psScroller != null && !this.havePsScroller()) {
            throw Error(errorMessagePrefix + '\'psScroller\' parameter must be a perfectScrollbarComponent');
        }
    }


}
