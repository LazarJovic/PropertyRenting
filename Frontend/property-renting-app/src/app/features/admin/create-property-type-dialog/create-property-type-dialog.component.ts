import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertyTypesService } from '@core/service/property-type-service/property-types.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-property-type-dialog',
  templateUrl: './create-property-type-dialog.component.html',
  styleUrls: ['./create-property-type-dialog.component.css']
})
export class CreatePropertyTypeDialogComponent implements OnInit {

  propertyTypeForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreatePropertyTypeDialogComponent>
  ) { }

  ngOnInit() {
    this.propertyTypeForm = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null)
    });
  }

  create() {
    this.dialogRef.close({ name: this.propertyTypeForm.value.name, description: this.propertyTypeForm.value.description });
  }

  close() {
    this.dialogRef.close();
  }

}
