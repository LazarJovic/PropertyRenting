import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePropertyTypeDialogComponent } from '../create-property-type-dialog/create-property-type-dialog.component';
import { PropertyTypesService } from '@core/service/property-type-service/property-types.service';


@Component({
  selector: 'app-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.css']
})
export class PropertyTypesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];

  constructor(
    private propertyTypeDialog: MatDialog,
    private propertyTypeService: PropertyTypesService
  ) { }

  ngOnInit() {
  }

  openPropertyTypeDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '300px';

    this.propertyTypeDialog.open(CreatePropertyTypeDialogComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response) {
          this.propertyTypeService.createPropertyType(response.name, response.description);
        }
      });
  }

}
