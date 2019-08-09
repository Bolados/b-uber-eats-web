import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DepartmentLayoutComponent} from './department-layout.component';

describe('DepartmentLayoutComponent', () => {
    let component: DepartmentLayoutComponent;
    let fixture: ComponentFixture<DepartmentLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DepartmentLayoutComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DepartmentLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
