import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentModeLayoutComponent} from './payment-mode-layout.component';

describe('PaymentModeLayoutComponent', () => {
  let component: PaymentModeLayoutComponent;
  let fixture: ComponentFixture<PaymentModeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentModeLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentModeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
