import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CheckAvailability } from '@core/model/check-availability';
import { CheckAvailabilityMessage } from 'src/proto/booking-request/booking_request_pb';
import { BookingRequestService } from 'src/proto/booking-request/booking_request_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';

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

}
