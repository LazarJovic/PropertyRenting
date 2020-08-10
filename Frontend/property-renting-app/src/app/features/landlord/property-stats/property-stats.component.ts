import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-stats',
  templateUrl: './property-stats.component.html',
  styleUrls: ['./property-stats.component.css']
})
export class PropertyStatsComponent implements OnInit {

  displayedColumnsNumberOfBookings: string[] = [
    'position',
    'image',
    'location',
    'bookingsNumber',
    'btnDetails',
  ];

  displayedColumnsBestRated: string[] = [
    'position',
    'image',
    'location',
    'averageRating',
    'btnDetails',
  ];

  constructor() { }

  ngOnInit() {
  }

}
