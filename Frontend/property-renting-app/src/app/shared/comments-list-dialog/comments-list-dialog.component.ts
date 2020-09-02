import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Comment } from '@angular/compiler';

@Component({
  selector: 'app-comments-list-dialog',
  templateUrl: './comments-list-dialog.component.html',
  styleUrls: ['./comments-list-dialog.component.css']
})
export class CommentsListDialogComponent implements OnInit {

  dataSource: MatTableDataSource<Comment> = new MatTableDataSource<Comment>();

  displayedColumns: string[] = ['person', 'email', 'timestamp', 'content'];

  constructor(
    public dialogRef: MatDialogRef<CommentsListDialogComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
