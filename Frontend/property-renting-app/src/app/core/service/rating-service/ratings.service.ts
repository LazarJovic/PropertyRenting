import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rating } from '@core/model/rating';
import { AdRatingMessage } from 'src/proto/rating/rating_pb';
import { AdRatingService } from 'src/proto/rating/rating_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(
    private toastr: ToastrService
  ) { }

  rateAd(rating: Rating) {
    const adRatingMessage: AdRatingMessage = new AdRatingMessage();
    adRatingMessage.setId(rating.id);
    adRatingMessage.setRating(rating.rating);
    adRatingMessage.setRequestId(rating.requestId);
    adRatingMessage.setAdId(rating.adId);
    adRatingMessage.setPropertyId(rating.propertyId);
    adRatingMessage.setAverageRating(rating.averageRating);

    grpc.unary(AdRatingService.RateAd, {
        request: adRatingMessage,
        host: environment.communication,
        onEnd: (res) => {
          const { status, statusMessage, headers, message, trailers } = res;

          if (status === grpc.Code.OK && message) {
            const returnValue = message.toObject();
            // tslint:disable-next-line: no-string-literal
            const returnMessage = returnValue['returnMessage'];

            returnMessage === 'OK'
              ? this.toastr.success('Ad rated')
              : this.toastr.error(returnMessage);
          } else {
            this.toastr.error('An error occurred while rating ad');
          }
        },
      });
  }

}
