import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canceled-booking-requests',
  templateUrl: './canceled-booking-requests.component.html',
  styleUrls: ['./canceled-booking-requests.component.css']
})
export class CanceledBookingRequestsComponent implements OnInit {
  displayedColumns: string[] = [
    'location',
    'bookingStart',
    'bookingEnd',
    'clientEmail',
    'btnDetails',
  ];
  constructor() { }

  ngOnInit() {
  }

}
