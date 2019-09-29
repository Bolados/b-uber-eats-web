import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhoneLayoutComponent} from './phone-layout.component';

describe('PhoneLayoutComponent', () => {
  let component: PhoneLayoutComponent;
  let fixture: ComponentFixture<PhoneLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
