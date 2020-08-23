import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Property } from '@core/model/property';
import { ChooseProperty } from '@core/model/choose-property';
import { PropertiesService } from '@core/service/property-service/properties.service';

@Component({
  selector: 'app-choose-property-dialog',
  templateUrl: './choose-property-dialog.component.html',
  styleUrls: ['./choose-property-dialog.component.css']
})
export class ChoosePropertyDialogComponent implements OnInit {

  properties: Array<ChooseProperty> = new Array<ChooseProperty>();

  constructor(
    public dialogRef: MatDialogRef<ChoosePropertyDialogComponent>,
    private propertyService: PropertiesService
  ) { }

  ngOnInit() {

    this.propertyService.getMyProperties().then(value => {
      this.properties = value;
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(property) {
    this.dialogRef.close({ property });
  }


}
