import { Component, OnInit } from '@angular/core';
import { ChooseProperty } from '@core/model/choose-property';
import { MatTableDataSource } from '@angular/material/table';
import { PropertiesService } from '@core/service/property-service/properties.service';
import { MyProperty } from '@core/model/my-property';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent implements OnInit {

  displayedColumns: string[] = ['image', 'location', 'size', 'furnished', 'internet', 'airCondition', 'btnDelete'];

  dataSource: MatTableDataSource<MyProperty> = new MatTableDataSource<MyProperty>();

  constructor(
    private propertyService: PropertiesService
  ) { }

  ngOnInit() {
    this.propertyService.myProperties().then(value => {
      this.dataSource = value;
    });
  }

}
