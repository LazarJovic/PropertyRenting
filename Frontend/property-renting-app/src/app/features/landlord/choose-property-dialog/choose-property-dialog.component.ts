import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-property-dialog',
  templateUrl: './choose-property-dialog.component.html',
  styleUrls: ['./choose-property-dialog.component.css']
})
export class ChoosePropertyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChoosePropertyDialogComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
