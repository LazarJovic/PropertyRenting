import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentsListDialogComponent } from '@shared/comments-list-dialog/comments-list-dialog.component';
import { AdDetails } from '@core/model/ad-details';
import { CommentsService } from '@core/service/comment-service/comments.service';

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

  @Input() ad: AdDetails;

  constructor(
    private commentsDialog: MatDialog,
    private commentService: CommentsService
  ) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      content: new FormControl(null)
    });
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
    this.commentService.createComment(this.ad.id, this.ad.propertyId, 3, this.commentForm.value.content);
  }

}
