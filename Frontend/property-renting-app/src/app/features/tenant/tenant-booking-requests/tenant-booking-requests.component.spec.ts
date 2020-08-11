import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantBookingRequestsComponent } from './tenant-booking-requests.component';

describe('TenantBookingRequestsComponent', () => {
  let component: TenantBookingRequestsComponent;
  let fixture: ComponentFixture<TenantBookingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantBookingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
