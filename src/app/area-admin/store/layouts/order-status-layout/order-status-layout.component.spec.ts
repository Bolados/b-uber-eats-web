import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusLayoutComponent } from './order-status-layout.component';

describe('OrderStatusLayoutComponent', () => {
  let component: OrderStatusLayoutComponent;
  let fixture: ComponentFixture<OrderStatusLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
