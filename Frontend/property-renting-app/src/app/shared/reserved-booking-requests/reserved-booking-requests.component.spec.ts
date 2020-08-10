import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedBookingRequestsComponent } from './reserved-booking-requests.component';

describe('ReservedBookingRequestsComponent', () => {
  let component: ReservedBookingRequestsComponent;
  let fixture: ComponentFixture<ReservedBookingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservedBookingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
