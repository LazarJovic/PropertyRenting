import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidBookingRequestsComponent } from './paid-booking-requests.component';

describe('PaidBookingRequestsComponent', () => {
  let component: PaidBookingRequestsComponent;
  let fixture: ComponentFixture<PaidBookingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidBookingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
