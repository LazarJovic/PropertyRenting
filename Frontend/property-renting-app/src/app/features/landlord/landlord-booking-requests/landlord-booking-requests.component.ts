import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookingRequest } from '@core/model/booking-request';
import { BookingRequestService } from 'src/proto/booking-request/booking_request_pb_service';
import { BookingRequestsService } from '@core/service/booking-request-service/booking-requests.service';

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

  dataSourcePending: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceReserved: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourcePaid: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceFinished: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceCanceled: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();

  isLandlord: boolean;
  constructor(
    private bookingRequestService: BookingRequestsService
  ) { }

  ngOnInit() {
    this.getAllRequests();
  }

  getAllRequests() {
    this.getAllPending();
    this.getAllReserved();
    this.getAllPaid();
    this.getAllFinished();
    this.getAllCanceled();
  }

  getAllPending() {
    this.bookingRequestService.getRequestsByStatus('PENDING').then(value => {
      this.dataSourcePending = value;
    });
  }

  getAllReserved() {
    this.bookingRequestService.getRequestsByStatus('RESERVED').then(value => {
      this.dataSourceReserved = value;
    });
  }

  getAllPaid() {
    this.bookingRequestService.getRequestsByStatus('PAID').then(value => {
      this.dataSourcePaid = value;
    });
  }

  getAllFinished() {
    this.bookingRequestService.getRequestsByStatus('FINISHED').then(value => {
      this.dataSourceFinished = value;
    });
  }

  getAllCanceled() {
    this.bookingRequestService.getRequestsByStatus('CANCELED').then(value => {
      this.dataSourceCanceled = value;
    });
  }

  requestDetails(request) {}

  accept(request) {}

  deny(request) {}

  messages(request) {}

  pay(request) {}

  cancel(request) {}

  finish(request) {}

}
