import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCustomerComponent } from './landing-customer.component';

describe('LandingCustomerComponent', () => {
  let component: LandingCustomerComponent;
  let fixture: ComponentFixture<LandingCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
