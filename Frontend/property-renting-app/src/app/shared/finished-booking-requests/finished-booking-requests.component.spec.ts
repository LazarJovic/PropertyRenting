import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedBookingRequestsComponent } from './finished-booking-requests.component';

describe('FinishedBookingRequestsComponent', () => {
  let component: FinishedBookingRequestsComponent;
  let fixture: ComponentFixture<FinishedBookingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedBookingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
