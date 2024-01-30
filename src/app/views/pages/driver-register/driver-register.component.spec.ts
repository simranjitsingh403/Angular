import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRegistorComponent } from './driver-register.component';

describe('DriverRegistorComponent', () => {
  let component: DriverRegistorComponent;
  let fixture: ComponentFixture<DriverRegistorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverRegistorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRegistorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
