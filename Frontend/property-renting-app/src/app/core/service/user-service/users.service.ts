import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/proto/user/user_pb_service';
import { GetByRoleMessage, UserMessage, UserIdMessage } from 'src/proto/user/user_pb';
import { Client } from '@core/model/client';
import { MatTableDataSource } from '@angular/material/table';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private toastr: ToastrService
  ) { }

  getUsersByType(role: string) {
    const getByRoleMessage: GetByRoleMessage = new GetByRoleMessage();
    getByRoleMessage.setRole(role);

    const dataSource: MatTableDataSource<Client> = new MatTableDataSource();

    const promise = new Promise<MatTableDataSource<Client>>((resolve, reject) => {
      grpc.invoke(UserService.GetUsersByRole, {
              request: getByRoleMessage,
              host: environment.user,
              onMessage: (message: UserMessage) => {
                const type: Client = new Client(message.getId(), message.getFirstName(), message.getSurname(),
                      message.getEmail(), message.getPhone(), message.getAccountBlocked(), message.getRole());
                dataSource.data.push(type);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(dataSource);
                } else {
                  this.toastr.error('An error occurred while getting users');
                }
              }
            });
    });

    return promise;
  }

  block(userId: number) {
    const userIdMessage = new UserIdMessage();
    userIdMessage.setId(userId);

    grpc.unary(UserService.BlockUser, {
      request: userIdMessage,
      host: environment.user,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          this.toastr.success('Account blocked successfully');
        } else {
          this.toastr.error('An error occurred while blocking user\'s account');
        }
      },
    });
  }

  unblock(userId: number) {
    const userIdMessage = new UserIdMessage();
    userIdMessage.setId(userId);

    grpc.unary(UserService.UnblockUser, {
      request: userIdMessage,
      host: environment.user,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          this.toastr.success('Account unblocked successfully');
        } else {
          this.toastr.error('An error occurred while unblocking user\'s account');
        }
      },
    });
  }

}
