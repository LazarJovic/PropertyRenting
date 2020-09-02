import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommentsService } from '@core/service/comment-service/comments.service';
import { DialogData } from '@shared/create-comment/create-comment.component';
import { Comment } from '@core/model/comment';

@Component({
  selector: 'app-comments-list-dialog',
  templateUrl: './comments-list-dialog.component.html',
  styleUrls: ['./comments-list-dialog.component.css']
})
export class CommentsListDialogComponent implements OnInit {

  dataSource: MatTableDataSource<Comment> = new MatTableDataSource<Comment>();

  displayedColumns: string[] = ['person', 'email', 'timestamp', 'content'];

  constructor(
    public dialogRef: MatDialogRef<CommentsListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private commentService: CommentsService
  ) { }

  ngOnInit() {
    this.commentService.getPropertyComments(this.data.propertyId).then(value => {
      this.dataSource = value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
