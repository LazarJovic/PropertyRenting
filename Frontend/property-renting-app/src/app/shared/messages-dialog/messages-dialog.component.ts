import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesDialogData } from '@features/landlord/landlord-booking-requests/landlord-booking-requests.component';
import { Message } from '@core/model/message';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { MessagesService } from '@core/service/message-service/messages.service';

@Component({
  selector: 'app-messages-dialog',
  templateUrl: './messages-dialog.component.html',
  styleUrls: ['./messages-dialog.component.css']
})
export class MessagesDialogComponent implements OnInit, OnDestroy {

  messageForm: FormGroup;
  noMessages: boolean;
  dataSource: MatTableDataSource<Message> = new MatTableDataSource<Message>();
  displayedColumns: string[] = ['sender', 'email', 'content', 'timestamp'];

  interval: any;

  constructor(
    public dialogRef: MatDialogRef<MessagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessagesDialogData,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    console.log(this.data.bookingId);
    this.messageForm = new FormGroup({
      message: new FormControl(null)
    });
    this.getMessages();

    this.interval = setInterval(() => {
      this.getMessages();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getMessages() {
    this.messageService.getBookingMessages(this.data.bookingId).then(value => {
      this.dataSource = value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
