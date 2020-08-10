import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserved-booking-requests',
  templateUrl: './reserved-booking-requests.component.html',
  styleUrls: ['./reserved-booking-requests.component.css'],
})
export class ReservedBookingRequestsComponent implements OnInit {
  displayedColumns: string[] = [];

  isLandlord: boolean;

  constructor() {}

  ngOnInit() {
    this.isLandlord = false;
    this.isLandlord
      ? (this.displayedColumns = [
          'location',
          'acceptanceDateTime',
          'bookingStart',
          'bookingEnd',
          'pricePerNight',
          'securityDeposit',
          'clientEmail',
          'btnDetails',
          'btnMessages',
          'btnCancel',
        ])
      : (this.displayedColumns = [
          'location',
          'acceptanceDateTime',
          'bookingStart',
          'bookingEnd',
          'pricePerNight',
          'securityDeposit',
          'clientEmail',
          'btnDetails',
          'btnMessages',
          'btnPay',
          'btnCancel',
        ]);
  }
}
