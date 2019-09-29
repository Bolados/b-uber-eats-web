import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseAreaAdminComponent} from './base-area-admin.component';

describe('BaseAreaAdminComponent', () => {
  let component: BaseAreaAdminComponent;
  let fixture: ComponentFixture<BaseAreaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseAreaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAreaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
