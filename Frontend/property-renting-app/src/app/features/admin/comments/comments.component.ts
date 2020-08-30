import { Component, OnInit } from '@angular/core';
import { CommentsService } from '@core/service/comment-service/comments.service';
import { MatTableDataSource } from '@angular/material/table';
import { Comment } from '@core/model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  dataSource: MatTableDataSource<Comment> = new MatTableDataSource<Comment>();

  displayedColumns: string[] = ['sender', 'senderEmail', 'timestamp', 'content', 'btnApprove', 'btnDeny'];

  constructor(
    private commentService: CommentsService
  ) { }

  ngOnInit() {
    this.commentService.getPendingComments().then(value => {
      this.dataSource = value;
    });
  }

  approve(comment) {
    this.commentService.acceptComment(comment.id);
    setTimeout(() => {
      this.updateCommentsTable();
    }, 300);
  }

  deny(comment) {
    this.commentService.denyComment(comment.id);
    setTimeout(() => {
      this.updateCommentsTable();
    }, 300);
  }

  updateCommentsTable() {
    this.commentService.getPendingComments().then(value => {
      this.dataSource = value;
    });
  }

}
