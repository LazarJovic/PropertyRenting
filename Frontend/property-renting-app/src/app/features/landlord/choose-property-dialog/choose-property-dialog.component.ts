import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Property } from '@core/model/property';
import { ChooseProperty } from '@core/model/choose-property';

@Component({
  selector: 'app-choose-property-dialog',
  templateUrl: './choose-property-dialog.component.html',
  styleUrls: ['./choose-property-dialog.component.css']
})
export class ChoosePropertyDialogComponent implements OnInit {

  properties: Array<ChooseProperty>;

  constructor(
    public dialogRef: MatDialogRef<ChoosePropertyDialogComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
