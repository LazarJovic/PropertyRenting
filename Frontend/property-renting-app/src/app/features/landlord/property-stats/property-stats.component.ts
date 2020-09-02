import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '@core/service/property-service/properties.service';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyStats } from '@core/model/property-stats';

@Component({
  selector: 'app-property-stats',
  templateUrl: './property-stats.component.html',
  styleUrls: ['./property-stats.component.css']
})
export class PropertyStatsComponent implements OnInit {

  displayedColumnsNumberOfBookings: string[] = ['position', 'image', 'location', 'type', 'bookingsNumber'];

  displayedColumnsBestRated: string[] = ['position', 'image', 'location', 'type', 'averageRating'];

  dataSourceBestRated: MatTableDataSource<PropertyStats> = new MatTableDataSource<PropertyStats>();
  dataSourceNumberOfBookings: MatTableDataSource<PropertyStats> = new MatTableDataSource<PropertyStats>();

  constructor(
    private propertyService: PropertiesService
  ) { }

  ngOnInit() {
    this.propertyService.getByRating().then(value => {
      this.dataSourceBestRated = value;
    });
    this.propertyService.getByBookings().then(value => {
      this.dataSourceNumberOfBookings = value;
    });
  }

}
