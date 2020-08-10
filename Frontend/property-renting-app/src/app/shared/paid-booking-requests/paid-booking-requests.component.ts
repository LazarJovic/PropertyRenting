import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paid-booking-requests',
  templateUrl: './paid-booking-requests.component.html',
  styleUrls: ['./paid-booking-requests.component.css']
})
export class PaidBookingRequestsComponent implements OnInit {
  displayedColumns: string[] = [];

  isLandlord: boolean;

  constructor() {}

  ngOnInit() {
    this.isLandlord = true;
    this.isLandlord
      ? (this.displayedColumns = [
          'location',
          'bookingStart',
          'bookingEnd',
          'pricePerNight',
          'clientEmail',
          'btnDetails',
          'btnFinish',
        ])
      : (this.displayedColumns = [
          'location',
          'bookingStart',
          'bookingEnd',
          'pricePerNight',
          'clientEmail',
          'btnDetails',
        ]);
  }

}
