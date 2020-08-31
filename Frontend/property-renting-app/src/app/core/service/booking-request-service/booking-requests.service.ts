import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CheckAvailability } from '@core/model/check-availability';
import { CheckAvailabilityMessage, BookingRequestStatusMessage, BookingRequestMessage,
   BookingRequestIdMessage } from 'src/proto/booking-request/booking_request_pb';
import { BookingRequestService } from 'src/proto/booking-request/booking_request_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';
import { BookingRequest } from '@core/model/booking-request';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyType } from '@core/model/property-type';

@Injectable({
  providedIn: 'root'
})
export class BookingRequestsService {

  constructor(
    private toastr: ToastrService
  ) { }

  checkAdAvailability(checkAvailability: CheckAvailability) {

    const checkAvailabilityMessage: CheckAvailabilityMessage = new CheckAvailabilityMessage();
    checkAvailabilityMessage.setAdId(checkAvailability.adId);
    checkAvailabilityMessage.setStartDate(checkAvailability.startDate);
    checkAvailabilityMessage.setEndDate(checkAvailability.endDate);

    const promise = new Promise<boolean>((resolve, reject) => {
      grpc.unary(BookingRequestService.CheckAvailability, {
        request: checkAvailabilityMessage,
        host: environment.booking,
        onEnd: (res) => {
          const { status, statusMessage, headers, message, trailers } = res;

          if (status === grpc.Code.OK && message) {
            const returnValue = message.toObject();
            // tslint:disable-next-line: no-string-literal
            // tslint:disable-next-line: no-string-literal
            const returnMessage = returnValue['returnMessage'];

            returnMessage === 'OK'
              // tslint:disable-next-line: no-string-literal
              ? resolve(returnValue['available'])
              // tslint:disable-next-line: no-string-literal
              : returnMessage === 'Property is already rented in chosen period' ? resolve(returnValue['available']) :
              this.toastr.error(returnMessage);
          } else {
            this.toastr.error('An error occurred while checking availability');
          }
        },
      });
    });

    return promise;
  }

  getRequestsByStatus(status: string) {
    const array: MatTableDataSource<BookingRequest> = new MatTableDataSource();

    const statusMessage: BookingRequestStatusMessage = new BookingRequestStatusMessage();
    statusMessage.setStatus(status);

    const promise = new Promise<MatTableDataSource<BookingRequest>>((resolve, reject) => {
      grpc.invoke(BookingRequestService.GetRequestsByStatus, {
              request: statusMessage,
              host: environment.booking,
              onMessage: (message: BookingRequestMessage) => {

                const pendingDateTime = message.getPendingDateTime().split('T')[0] + ' '
                                        + message.getPendingDateTime().split('T')[1].substring(0, 5);
                const acceptanceDateTime = message.getAcceptanceDateTime().split('T')[0] + ' '
                                        + message.getAcceptanceDateTime().split('T')[1].substring(0, 5);

                const request: BookingRequest = new BookingRequest(message.getId(), message.getAdId(), message.getCountry(),
                                    message.getCity(), message.getAddress(), message.getPrice(), message.getSecurityDeposit(),
                                    pendingDateTime, acceptanceDateTime, message.getBookingStart(),
                                    message.getBookingEnd(), message.getClientEmail());
                array.data.push(request);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(array);
                } else {
                  this.toastr.error('An error occurred while getting booking reqests');
                }
              }
            });
    });

    return promise;
  }

  acceptBookingRequest(requestId: number) {

    const requestIdMessage: BookingRequestIdMessage = new BookingRequestIdMessage();
    requestIdMessage.setId(requestId);

    grpc.unary(BookingRequestService.AcceptBookingRequest, {
      request: requestIdMessage,
      host: environment.booking,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          returnMessage === 'OK'
            ? this.toastr.success('Booking request successfully accepted')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while accepting booking request');
        }
      },
    });
  }

  denyBookingRequest(requestId: number) {

    const requestIdMessage: BookingRequestIdMessage = new BookingRequestIdMessage();
    requestIdMessage.setId(requestId);

    grpc.unary(BookingRequestService.DenyBookingRequest, {
      request: requestIdMessage,
      host: environment.booking,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          returnMessage === 'OK'
            ? this.toastr.success('Booking request successfully denied')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while denying booking request');
        }
      },
    });

  }


}
