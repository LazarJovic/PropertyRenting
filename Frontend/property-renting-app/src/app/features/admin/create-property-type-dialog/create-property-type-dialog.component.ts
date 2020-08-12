import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-property-type-dialog',
  templateUrl: './create-property-type-dialog.component.html',
  styleUrls: ['./create-property-type-dialog.component.css']
})
export class CreatePropertyTypeDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CreatePropertyTypeDialogComponent>
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
