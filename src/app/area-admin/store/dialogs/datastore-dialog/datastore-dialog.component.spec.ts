import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreDialogComponent } from './datastore-dialog.component';

describe('DatastoreDialogComponent', () => {
  let component: DatastoreDialogComponent;
  let fixture: ComponentFixture<DatastoreDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastoreDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
