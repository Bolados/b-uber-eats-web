import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatastoreActionsComponent} from './datastore-actions.component';

describe('DatastoreActionsComponent', () => {
    let component: DatastoreActionsComponent;
    let fixture: ComponentFixture<DatastoreActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatastoreActionsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatastoreActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
