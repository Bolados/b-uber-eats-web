import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DistrictLayoutComponent} from './district-layout.component';

describe('DistrictLayoutComponent', () => {
    let component: DistrictLayoutComponent;
    let fixture: ComponentFixture<DistrictLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DistrictLayoutComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DistrictLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
