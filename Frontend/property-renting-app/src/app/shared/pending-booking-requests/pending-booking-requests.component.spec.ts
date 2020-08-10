import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBookingRequestsComponent } from './pending-booking-requests.component';

describe('PendingBookingRequestsComponent', () => {
  let component: PendingBookingRequestsComponent;
  let fixture: ComponentFixture<PendingBookingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBookingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
