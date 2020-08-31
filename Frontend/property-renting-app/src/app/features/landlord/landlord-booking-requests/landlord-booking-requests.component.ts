import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landlord-booking-requests',
  templateUrl: './landlord-booking-requests.component.html',
  styleUrls: ['./landlord-booking-requests.component.css']
})
export class LandlordBookingRequestsComponent implements OnInit {

  displayedColumnsPending: string[] = ['location', 'pendingDateTime', 'bookingStart', 'bookingEnd', 'clientEmail', 'btnDetails',
                                      'btnAccept', 'btnDeny'];
  displayedColumnsPaid: string[] = ['location', 'bookingStart', 'bookingEnd', 'pricePerNight', 'clientEmail', 'btnDetails', 'btnFinish'];
  displayedColumnsReserved: string[] = ['location', 'acceptanceDateTime', 'bookingStart', 'bookingEnd', 'pricePerNight', 'securityDeposit',
                                        'clientEmail', 'btnDetails', 'btnMessages', 'btnCancel'];
  displayedColumnsFinished: string[] = ['location', 'bookingStart', 'bookingEnd', 'clientEmail', 'btnDetails'];
  displayedColumnsCanceled: string[] = ['location', 'bookingStart', 'bookingEnd', 'clientEmail', 'btnDetails'];

  isLandlord: boolean;
  constructor() { }

  ngOnInit() {
  }

  requestDetails(request) {}

  accept(request) {}

  deny(request) {}

  messages(request) {}

  pay(request) {}

  cancel(request) {}

  finish(request) {}

}
