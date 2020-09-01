import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookingRequest } from '@core/model/booking-request';
import { Router } from '@angular/router';
import { BookingRequestsService } from '@core/service/booking-request-service/booking-requests.service';

@Component({
  selector: 'app-tenant-booking-requests',
  templateUrl: './tenant-booking-requests.component.html',
  styleUrls: ['./tenant-booking-requests.component.css']
})
export class TenantBookingRequestsComponent implements OnInit {

  displayedColumnsPending: string[] = ['location', 'pendingDateTime', 'bookingStart', 'bookingEnd', 'clientEmail', 'btnDetails',
                                        'btnCancel'];
  displayedColumnsReserved: string[] = ['location', 'acceptanceDateTime', 'bookingStart', 'bookingEnd', 'pricePerNight', 'securityDeposit',
                                        'clientEmail', 'btnDetails', 'btnPay', 'btnMessages'];
  displayedColumnsPaid: string[] = ['location', 'bookingStart', 'bookingEnd', 'pricePerNight', 'clientEmail', 'btnDetails'];

  displayedColumnsFinished: string[] = ['location', 'bookingStart', 'bookingEnd', 'clientEmail', 'btnDetails'];
  displayedColumnsCanceled: string[] = ['location', 'bookingStart', 'bookingEnd', 'clientEmail', 'btnDetails'];

  dataSourcePending: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceReserved: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourcePaid: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceFinished: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceCanceled: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();

  constructor(
    private router: Router,
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

  requestDetails(request) {
    this.router.navigate([`tenant/ad/${request.adId}`]);
  }

  pay(request) {
    this.bookingRequestService.payBookingRequest(request.id);
    setTimeout(() => {
      this.getAllReserved();
      this.getAllPaid();
    }, 500);
  }

  cancel(request) {
    this.bookingRequestService.cancelBookingRequest(request.id);
    setTimeout(() => {
      this.getAllPending();
      this.getAllCanceled();
    }, 500);
  }

}
