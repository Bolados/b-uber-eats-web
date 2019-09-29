import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TownLayoutComponent} from './town-layout.component';

describe('TownLayoutComponent', () => {
    let component: TownLayoutComponent;
    let fixture: ComponentFixture<TownLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TownLayoutComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TownLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
