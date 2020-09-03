import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookingRequest } from '@core/model/booking-request';
import { BookingRequestService } from 'src/proto/booking-request/booking_request_pb_service';
import { BookingRequestsService } from '@core/service/booking-request-service/booking-requests.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessagesDialogComponent } from '@shared/messages-dialog/messages-dialog.component';

export interface MessagesDialogData {
  bookingId: number;
}

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
                                        'clientEmail', 'btnDetails', 'btnMessages'];
  displayedColumnsFinished: string[] = ['location', 'bookingStart', 'bookingEnd', 'clientEmail', 'btnDetails'];
  displayedColumnsCanceled: string[] = ['location', 'bookingStart', 'bookingEnd', 'clientEmail', 'btnDetails'];

  dataSourcePending: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceReserved: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourcePaid: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceFinished: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();
  dataSourceCanceled: MatTableDataSource<BookingRequest> = new MatTableDataSource<BookingRequest>();

  isLandlord: boolean;
  constructor(
    private messagesDialog: MatDialog,
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
    this.router.navigate([`landlord/ad/${request.adId}`], {state: {data: request}});
  }

  accept(request) {
    this.bookingRequestService.acceptBookingRequest(request.id);
    setTimeout(() => {
      this.getAllPending();
      this.getAllReserved();
    }, 500);
  }

  deny(request) {
    this.bookingRequestService.denyBookingRequest(request.id);
    setTimeout(() => {
      this.getAllPending();
      this.getAllCanceled();
    }, 500);
  }

  messages(request) {
    const dialogRef = this.messagesDialog.open(MessagesDialogComponent, {
      width: '80vw',
      height: '90vh',
      data: {
        bookingId: request.id
      }
    });
  }

  finish(request) {
    this.bookingRequestService.finishBookingRequest(request.id);
    setTimeout(() => {
      this.getAllPaid();
      this.getAllFinished();
    }, 500);
  }

}
