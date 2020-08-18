import { Injectable } from '@angular/core';
import { Property } from '@core/model/property';
import { ToastrService } from 'ngx-toastr';
import { PropertyService } from 'src/proto/property/property_pb_service';
import { PropertyImageMessage, PropertyMessage } from 'src/proto/property/property_pb';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(
    private toastr: ToastrService
  ) { }

  registerProperty(property: Property, propertyImage: File, imageObject: any) {

    const propertyImageMessage: PropertyImageMessage = new PropertyImageMessage();
    propertyImageMessage.setPicByte(imageObject);
    propertyImageMessage.setName(propertyImage.name);
    propertyImageMessage.setType(propertyImage.type);
    propertyImageMessage.setPicByte(propertyImageMessage.getPicByte().toString().substring(23));

    const propertyMessage: PropertyMessage = new PropertyMessage();
    propertyMessage.setId(property.id);
    propertyMessage.setTypeId(property.type);
    propertyMessage.setCountry(property.country);
    propertyMessage.setCity(property.city);
    propertyMessage.setAddress(property.address);
    propertyMessage.setSize(property.size);
    propertyMessage.setNumberOfRooms(property.numberOfRooms);
    propertyMessage.setDistanceFromCenter(property.distanceFromCenter);
    propertyMessage.setFurnished(property.furnished);
    propertyMessage.setInternetIncluded(property.internetIncluded);
    propertyMessage.setAirConditionIncluded(property.airConditionIncluded);
    propertyMessage.setAverageRating(0);
    propertyMessage.setImage(propertyImageMessage);

    grpc.unary(PropertyService.RegisterProperty, {
      request: propertyMessage,
      host: environment.property,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          returnMessage === 'OK'
            ? this.toastr.success('Property registered!')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while registering property');
        }
      },
    });
  }

}
