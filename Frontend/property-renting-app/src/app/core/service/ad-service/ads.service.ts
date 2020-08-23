import { Injectable } from '@angular/core';
import { Ad } from '@core/model/ad';
import { AdMessage, AdImageMessage } from 'src/proto/ad/ad_pb';
import { AdService } from 'src/proto/ad/ad_pb_service';
import { ToastrService } from 'ngx-toastr';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(
    private toastr: ToastrService
  ) { }

  createAd(ad: Ad, images: Array<any>) {

    const adImages: AdImageMessage[] = [];

    images.forEach(image => {
      const imageMessage: AdImageMessage = new AdImageMessage();
      imageMessage.setName(image.name);
      imageMessage.setType(image.type);
      imageMessage.setPicByte(image.image);
      imageMessage.setPicByte(imageMessage.getPicByte().toString().substring(23));
      adImages.push(imageMessage);
    });
    console.log(adImages);
    const adMessage: AdMessage = new AdMessage();
    adMessage.setId(ad.id);
    adMessage.setPropertyId(ad.propertyId);
    adMessage.setDurationLimited(ad.durationLimited);
    adMessage.setStartDate(ad.startDate);
    adMessage.setEndDate(ad.endDate);
    adMessage.setGuestPreference(ad.guestPreference);
    adMessage.setPricePerNight(ad.pricePerNight);
    adMessage.setSecurityDeposit(ad.securityDeposit);
    adMessage.setAdditionalInfo(ad.additionalInfo);
    adMessage.setImagesList(adImages);

    grpc.unary(AdService.CreateAd, {
      request: adMessage,
      host: environment.ad,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          returnMessage === 'OK'
            ? this.toastr.success('Ad created!')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while creating ad');
        }
      },
    });
  }

}
