import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressLayoutComponent} from './address-layout.component';

describe('AddressLayoutComponent', () => {
    let component: AddressLayoutComponent;
    let fixture: ComponentFixture<AddressLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddressLayoutComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
