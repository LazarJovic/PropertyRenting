import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentsListDialogComponent } from '@shared/comments-list-dialog/comments-list-dialog.component';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  commentForm: FormGroup;

  constructor(
    private commentsDialog: MatDialog
  ) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      comment: new FormControl(null)
    });
  }

  showComments() {
    const dialogRef = this.commentsDialog.open(CommentsListDialogComponent, {
      width: '80vw',
      height: '90vh'
    });
  }

}
