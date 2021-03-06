import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BreadcrumbService, Breadcrumb} from 'angular-crumbs';
import {FullscreenService} from '../../services/fullscreen';
import { Router } from '@angular/router';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, AfterViewInit {

    @Input() title;
    fullscreen: boolean = this.fullscreenService.isFullscreen();

    private lastExcecution = new Date();
    constructor(
        private router: Router,
        private titleService: Title,
        private changeDetectorRef: ChangeDetectorRef,
        private breadcrumbService: BreadcrumbService,
        private fullscreenService: FullscreenService,
    ) {
    }

    initialize() {

    }

    ngOnInit() {
        this.initialize();
        this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
            // this.titleService.setTitle(this.currentPage(crumbs));
        });
        this.fullscreenService.fullscreenEmitter.subscribe( (state: boolean) => {
            this.fullscreen = state;
        });
    }

    ngAfterViewInit(): void {
    }

    // private currentPage(routesCollection: Breadcrumb[]) {
    //     const titles = routesCollection.filter((route) => route.terminal === true);
    //     const routeTitle = titles.reduce( (prev, curr) => {
    //         return curr.displayName;
    //     }, '');
    //     return routeTitle;
    // }

    // private createTitle(routesCollection: Breadcrumb[]) {
    //     const title = 'Breadcrumb';
    //     const titles = routesCollection.filter((route) => route.displayName);

    //     if (!titles.length) { return title; }

    //     const routeTitle = this.titlesToString(titles);
    //     return `${routeTitle} ${title} `;
    // }

    // private titlesToString(titles) {
    //     return titles.reduce((prev, curr) => {
    //         return `${curr.displayName} - ${prev}`;
    //     }, '');
    // }

}
