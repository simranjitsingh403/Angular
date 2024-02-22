import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShipmentComponent } from './customer-shipment.component';

describe('CustomerShipmentComponent', () => {
  let component: CustomerShipmentComponent;
  let fixture: ComponentFixture<CustomerShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
