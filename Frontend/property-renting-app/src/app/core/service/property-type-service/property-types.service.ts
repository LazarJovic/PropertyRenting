import { Injectable } from '@angular/core';
import { PropertyTypeService } from 'src/proto/property-type/property_type_pb_service';
import { PropertyTypeMessage } from 'src/proto/property-type/property_type_pb';
import { grpc } from '@improbable-eng/grpc-web';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertyTypesService {
  constructor(private toastr: ToastrService) {}

  createPropertyType(name: string, description: string) {

    const propertyTypeMessage = new PropertyTypeMessage();
    propertyTypeMessage.setName(name);
    propertyTypeMessage.setDescription(description);

    grpc.unary(PropertyTypeService.CreatePropertyType, {
      request: propertyTypeMessage,
      host: environment.property,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnmessage'];

          returnMessage === 'OK'
            ? this.toastr.success('Property type created!')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while creating property type')
        }
      },
    });
  }
}
