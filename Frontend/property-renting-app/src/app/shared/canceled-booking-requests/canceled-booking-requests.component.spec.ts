import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledBookingRequestsComponent } from './canceled-booking-requests.component';

describe('CanceledBookingRequestsComponent', () => {
  let component: CanceledBookingRequestsComponent;
  let fixture: ComponentFixture<CanceledBookingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceledBookingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
