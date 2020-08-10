import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finished-booking-requests',
  templateUrl: './finished-booking-requests.component.html',
  styleUrls: ['./finished-booking-requests.component.css'],
})
export class FinishedBookingRequestsComponent implements OnInit {
  displayedColumns: string[] = [
    'location',
    'bookingStart',
    'bookingEnd',
    'clientEmail',
    'btnDetails',
  ];

  constructor() {}

  ngOnInit() {}
}
