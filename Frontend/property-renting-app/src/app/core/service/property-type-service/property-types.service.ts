import { Injectable } from '@angular/core';
import { PropertyTypeService } from 'src/proto/property-type/property_type_pb_service';
import { PropertyTypeMessage } from 'src/proto/property-type/property_type_pb';
import { grpc } from '@improbable-eng/grpc-web';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypesService {

  constructor() { }

  createPropertyType(name: string, description: string) {
    const propertyTypeMessage = new PropertyTypeMessage();
    propertyTypeMessage.setName(name);
    propertyTypeMessage.setDescription(description);
    grpc.unary(PropertyTypeService.CreatePropertyType, {
      request: propertyTypeMessage,
      host: 'http://localhost:8080',
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log('all ok. got hello: ', message.toObject());
        }
      },
    });
  }

}
