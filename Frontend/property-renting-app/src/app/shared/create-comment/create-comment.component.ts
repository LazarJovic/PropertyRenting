import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentsListDialogComponent } from '@shared/comments-list-dialog/comments-list-dialog.component';
import { AdDetails } from '@core/model/ad-details';
import { CommentsService } from '@core/service/comment-service/comments.service';
import { BookingRequest } from '@core/model/booking-request';

export interface DialogData {
  propertyId: number;
}

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  commentForm: FormGroup;
  isLandlord: boolean;
  isTenant: boolean;

  @Input() ad: AdDetails;
  @Input() request: BookingRequest;

  constructor(
    private commentsDialog: MatDialog,
    private commentService: CommentsService
  ) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      content: new FormControl(null)
    });

    const user: {
      accessToken: string;
      expiresIn: number;
      userId: number;
      role: string;
    } = JSON.parse(localStorage.getItem('loggedUser'));
    if (user && user.role === 'ROLE_LANDLORD') {
      this.isLandlord = true;
      this.isTenant = false;
    } else if (user && user.role === 'ROLE_TENANT') {
      this.isLandlord = false;
      this.isTenant = true;
    }
  }

  showComments() {
    const dialogRef = this.commentsDialog.open(CommentsListDialogComponent, {
      width: '80vw',
      height: '90vh',
      data: {
        propertyId: this.ad.propertyId
      }
    });
  }

  leaveComment() {
    this.commentService.createComment(this.ad.id, this.ad.propertyId, this.request.id, this.commentForm.value.content);
  }

}
