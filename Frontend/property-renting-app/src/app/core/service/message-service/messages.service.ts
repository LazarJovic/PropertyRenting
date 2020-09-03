import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from '@core/model/message';
import { GetRequestMessages, MessageMessage, CreateMessageRequest } from 'src/proto/message/message_pb';
import { MessageService } from 'src/proto/message/message_pb_service';
import { MatTableDataSource } from '@angular/material/table';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';
import { CommentMessage } from 'src/proto/comment/comment_pb';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private toastr: ToastrService
  ) { }


  getBookingMessages(bookingId: number) {

    const array: MatTableDataSource<Message> = new MatTableDataSource();

    const getMessagesRequest: GetRequestMessages = new GetRequestMessages();
    getMessagesRequest.setBookingId(bookingId);

    const promise = new Promise<MatTableDataSource<Message>>((resolve, reject) => {
      grpc.invoke(MessageService.GetAllRequestMessages, {
              request: getMessagesRequest,
              host: environment.communication,
              onMessage: (message: MessageMessage) => {

                const timestamp = message.getTimestamp().split('T')[0] + ' ' + message.getTimestamp().split('T')[1].substring(0, 5);

                const myMessage: Message = new Message(message.getId(), message.getSenderName(), message.getSenderSurname(),
                                message.getSenderEmail(), message.getContent(), timestamp, message.getIsTenantSender(),
                                message.getBookingId());

                array.data.push(myMessage);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(array);
                } else {
                  this.toastr.error('An error occurred while getting booking messages');
                }
              }
            });
    });

    return promise;

  }

  createMessage(bookingId: number, content: string) {

    const createMessageRequest: CreateMessageRequest = new CreateMessageRequest();
    createMessageRequest.setRequestId(bookingId);
    createMessageRequest.setContent(content);

    grpc.unary(MessageService.CreateMessage, {
      request: createMessageRequest,
      host: environment.communication,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          returnMessage === 'OK'
            ? this.toastr.success('Message created')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while creating message');
        }
      },
    });
  }

}
