import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordBookingRequestsComponent } from './landlord-booking-requests.component';

describe('LandlordBookingRequestsComponent', () => {
  let component: LandlordBookingRequestsComponent;
  let fixture: ComponentFixture<LandlordBookingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordBookingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
