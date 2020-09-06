import { Injectable } from '@angular/core';
import { PropertyTypeService } from 'src/proto/property-type/property_type_pb_service';
import { PropertyTypeMessage, EmptyMessage } from 'src/proto/property-type/property_type_pb';
import { grpc } from '@improbable-eng/grpc-web';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Observable } from 'rxjs';
import { PropertyType } from '@core/model/property-type';
import { MatTableDataSource } from '@angular/material/table';
import { AuthTokenService } from '../auth-token-service/auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyTypesService {
  constructor(
    private toastr: ToastrService,
    private authTokenService: AuthTokenService
  ) {}

  createPropertyType(name: string, description: string) {

    const propertyTypeMessage = new PropertyTypeMessage();
    propertyTypeMessage.setName(name);
    propertyTypeMessage.setDescription(description);

    grpc.unary(PropertyTypeService.CreatePropertyType, {
      metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
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
          this.toastr.error('An error occurred while creating property type');
        }
      },
    });
  }

  getPropertyTypes() {

    const array: MatTableDataSource<PropertyType> = new MatTableDataSource();

    const promise = new Promise<MatTableDataSource<PropertyType>>((resolve, reject) => {
      grpc.invoke(PropertyTypeService.GetAllPropertyTypes, {
              metadata: {Authorization: 'Bearer ' + this.authTokenService.getAccessToken()},
              request: new EmptyMessage(),
              host: environment.property,
              onMessage: (message: PropertyTypeMessage) => {
                const type: PropertyType = new PropertyType(message.getId(), message.getName(), message.getDescription());
                array.data.push(type);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(array);
                } else {
                  this.toastr.error('An error occurred while getting property types');
                }
              }
            });
    });

    return promise;
  }


}
