import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-booking-requests',
  templateUrl: './pending-booking-requests.component.html',
  styleUrls: ['./pending-booking-requests.component.css'],
})
export class PendingBookingRequestsComponent implements OnInit {
  displayedColumns: string[] = [];

  isLandlord: boolean;

  constructor() {}

  ngOnInit() {
    this.isLandlord = true;
    this.isLandlord
      ? (this.displayedColumns = [
          'location',
          'pendingDateTime',
          'bookingStart',
          'bookingEnd',
          'clientEmail',
          'btnDetails',
          'btnAccept',
          'btnDeny',
        ])
      : (this.displayedColumns = [
          'location',
          'pendingDateTime',
          'bookingStart',
          'bookingEnd',
          'clientEmail',
          'btnDetails'
        ]);
  }
}
