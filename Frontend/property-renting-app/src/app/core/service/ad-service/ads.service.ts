import { Injectable } from '@angular/core';
import { Ad } from '@core/model/ad';
import { AdMessage, AdImageMessage, SearchAdMessage, SearchAdResultMessage, AdIdMessage, AdDetailsMessage,
   MyAdMessage } from 'src/proto/ad/ad_pb';
import { AdService } from 'src/proto/ad/ad_pb_service';
import { ToastrService } from 'ngx-toastr';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';
import { SearchAdsComponent } from '@shared/search-ads/search-ads.component';
import { SearchAd } from '@core/model/search-ad';
import { SearchAdResult } from '@core/model/search-ad-result';
import { AdDetails } from '@core/model/ad-details';
import { AdImage } from '@core/model/ad-image';
import { MatTableDataSource } from '@angular/material/table';
import { MyAd } from '@core/model/my-ad';
import { EmptyMessage } from 'src/proto/property-type/property_type_pb';
import { AuthTokenService } from '../auth-token-service/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(
    private toastr: ToastrService,
    private authTokenService: AuthTokenService
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
      metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
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

  searchAds(searchAd: SearchAd) {

    const array: Array<SearchAdResult> = new Array<SearchAdResult>();

    const searchAdMessage: SearchAdMessage = new SearchAdMessage();
    searchAdMessage.setStartDate(searchAd.startDate);
    searchAdMessage.setEndDate(searchAd.endDate);
    searchAdMessage.setType(searchAd.type);
    searchAdMessage.setCountry(searchAd.country);
    searchAdMessage.setCity(searchAd.city);
    searchAdMessage.setAddress(searchAd.address);
    searchAdMessage.setSizeMin(searchAd.sizeMin);
    searchAdMessage.setSizeMax(searchAd.sizeMax);
    searchAdMessage.setNumberOfRoomsMin(searchAd.numberOfRoomsMin);
    searchAdMessage.setNumberOfRoomsMax(searchAd.numberOfRoomsMax);
    searchAdMessage.setDistanceFromCenterMin(searchAd.distanceFromCenterMin);
    searchAdMessage.setDistanceFromCenterMax(searchAd.distanceFromCenterMax);
    searchAdMessage.setPriceMin(searchAd.priceMin);
    searchAdMessage.setPriceMax(searchAd.priceMax);
    searchAdMessage.setFurnished(searchAd.furnished);
    searchAdMessage.setInternetIncluded(searchAd.internetIncluded);
    searchAdMessage.setAirConditionIncluded(searchAd.airConditionIncluded);

    const promise = new Promise<Array<SearchAdResult>>((resolve, reject) => {
      grpc.invoke(AdService.SearchAds, {
              metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
              request: searchAdMessage,
              host: environment.ad,
              onMessage: (message: SearchAdResultMessage) => {

                const result: SearchAdResult = new SearchAdResult(message.getId(), message.getStartDate(), message.getEndDate(),
                  message.getType(), message.getCountry(), message.getCity(), message.getAddress(),
                  message.getSecurityDeposit(), message.getPrice(),
                  message.getImage().getPicByte_asB64());

                array.push(result);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(array);
                } else {
                  this.toastr.error('An error occurred while getting search results');
                }
              }
            });
    });

    return promise;

  }

  getAdDetails(id: number) {
    const adIdMessage: AdIdMessage = new AdIdMessage();
    adIdMessage.setId(id);

    const promise = new Promise<AdDetails>((resolve, reject) => {
    grpc.unary(AdService.GetAdDetails, {
        metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
        request: adIdMessage,
        host: environment.ad,
        onEnd: (res) => {
          const { status, statusMessage, headers, message, trailers } = res;

          if (status === grpc.Code.OK && message) {
            const returnValue = message.toObject();
            // tslint:disable-next-line: no-string-literal
            const adDetails: AdDetails = new AdDetails(returnValue['id'], returnValue['startDate'], returnValue['endDate'],
            // tslint:disable-next-line: no-string-literal
              returnValue['postingDate'], returnValue['price'], returnValue['securityDeposit'], returnValue['guestPreference'],
              // tslint:disable-next-line: no-string-literal
              returnValue['additionalInfo'], returnValue['type'], returnValue['country'], returnValue['city'], returnValue['address'],
              // tslint:disable-next-line: no-string-literal
              returnValue['size'], returnValue['numberOfRooms'], returnValue['distanceFromCenter'], returnValue['furnished'],
              // tslint:disable-next-line: no-string-literal
              returnValue['internetIncluded'], returnValue['airConditionIncluded'], returnValue['averageRating'],
              // tslint:disable-next-line: no-string-literal
              returnValue['propertyId']);

            resolve(adDetails);
          } else {
            this.toastr.error('An error occurred while creating ad');
          }
        },
      });
    });

    return promise;
  }

  getAdImages(id: number) {
    const array: Array<AdImage> = new Array();

    const adIdMessage: AdIdMessage = new AdIdMessage();
    adIdMessage.setId(id);

    const promise = new Promise<Array<AdImage>>((resolve, reject) => {
      grpc.invoke(AdService.GetAdImages, {
              metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
              request: adIdMessage,
              host: environment.ad,
              onMessage: (message: AdImageMessage) => {
                const image: AdImage = new AdImage(message.getName(), message.getType(), message.getPicByte_asB64());
                array.push(image);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(array);
                } else {
                  this.toastr.error('An error occurred while getting ad\'s images');
                }
              }
            });
    });

    return promise;
  }

  getMyActiveAds() {
    const array: MatTableDataSource<MyAd> = new MatTableDataSource<MyAd>();

    const promise = new Promise<MatTableDataSource<MyAd>>((resolve, reject) => {
      grpc.invoke(AdService.GetMyActiveAds, {
              metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
              request: new EmptyMessage(),
              host: environment.ad,
              onMessage: (message: MyAdMessage) => {

                const adImage: string = 'data:image/jpeg;base64,' + message.getImage().getPicByte_asB64();

                const postingDateTime = message.getPostingDate().split('T')[0] + ' '
                                        + message.getPostingDate().split('T')[1].substring(0, 5);

                const myAd: MyAd = new MyAd(message.getId(), message.getCountry(), message.getCity(), message.getAddress(),
                              postingDateTime, message.getStartDate(), message.getEndDate(), message.getPrice(), adImage);

                array.data.push(myAd);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(array);
                } else {
                  this.toastr.error('An error occurred while getting active ads');
                }
              }
            });
    });

    return promise;
  }

  getMyInactiveAds() {
    const array: MatTableDataSource<MyAd> = new MatTableDataSource<MyAd>();

    const promise = new Promise<MatTableDataSource<MyAd>>((resolve, reject) => {
      grpc.invoke(AdService.GetMyInactiveAds, {
              metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
              request: new EmptyMessage(),
              host: environment.ad,
              onMessage: (message: MyAdMessage) => {

                const adImage: string = 'data:image/jpeg;base64,' + message.getImage().getPicByte_asB64();

                const postingDateTime = message.getPostingDate().split('T')[0] + ' '
                                        + message.getPostingDate().split('T')[1].substring(0, 5);

                const myAd: MyAd = new MyAd(message.getId(), message.getCountry(), message.getCity(), message.getAddress(),
                              postingDateTime, message.getStartDate(), message.getEndDate(), message.getPrice(), adImage);

                array.data.push(myAd);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(array);
                } else {
                  this.toastr.error('An error occurred while getting active ads');
                }
              }
            });
    });

    return promise;
  }

  deleteAd(adId: number) {

    const adIdMessage: AdIdMessage = new AdIdMessage();
    adIdMessage.setId(adId);

    grpc.unary(AdService.DeleteAd, {
      metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
      request: adIdMessage,
      host: environment.ad,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          returnMessage === 'OK'
            ? this.toastr.success('Ad deleted')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while deleting ad');
        }
      },
    });
  }

}
