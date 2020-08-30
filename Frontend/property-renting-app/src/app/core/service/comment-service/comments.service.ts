import { Injectable } from '@angular/core';
import { CommentService } from 'src/proto/comment/comment_pb_service';
import { MatTableDataSource } from '@angular/material/table';
import { grpc } from '@improbable-eng/grpc-web';
import { EmptyMessage } from 'src/proto/property-type/property_type_pb';
import { environment } from 'src/environments/environment';
import { CommentMessage, CommentIdMessage } from 'src/proto/comment/comment_pb';
import { Comment } from '@core/model/comment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private toastr: ToastrService
  ) { }

  getPendingComments() {

    const array: MatTableDataSource<Comment> = new MatTableDataSource();

    const promise = new Promise<MatTableDataSource<Comment>>((resolve, reject) => {
      grpc.invoke(CommentService.GetAllPendingComments, {
              request: new EmptyMessage(),
              host: environment.communication,
              onMessage: (message: CommentMessage) => {
                const timestamp = message.getTimestamp().split('T')[0] + ' ' + message.getTimestamp().split('T')[1].substring(0, 5);
                const type: Comment = new Comment(message.getId(), message.getFirstName(), message.getSurname(),
                                message.getEmail(), timestamp, message.getContent());
                array.data.push(type);
              },
              onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
                if (code === grpc.Code.OK) {
                  resolve(array);
                } else {
                  this.toastr.error('An error occurred while getting pending comments');
                }
              }
            });
    });

    return promise;
  }

  acceptComment(id: number) {

    const commentIdMessage: CommentIdMessage = new CommentIdMessage();
    commentIdMessage.setId(id);

    grpc.unary(CommentService.AcceptComment, {
      request: commentIdMessage,
      host: environment.communication,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          if (returnValue) {
            this.toastr.success('Comment accepted');
          }
        } else {
          this.toastr.error('An error occurred while accepting comment');
        }
      },
    });
  }

}
