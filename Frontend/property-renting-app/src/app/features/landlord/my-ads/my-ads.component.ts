import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MyAd } from '@core/model/my-ad';
import { AdService } from 'src/proto/ad/ad_pb_service';
import { AdsService } from '@core/service/ad-service/ads.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css'],
})
export class MyAdsComponent implements OnInit {
  displayedColumnsActive: string[] = ['image', 'location', 'postingDate', 'startDate', 'endDate', 'pricePerNight',
                                      'btnDetails', 'btnDelete'];
  displayedColumnsInactive: string[] = ['image', 'location', 'postingDate', 'startDate', 'endDate', 'pricePerNight', 'btnDetails'];

  dataSourceActive: MatTableDataSource<MyAd> = new MatTableDataSource<MyAd>();
  dataSourceInctive: MatTableDataSource<MyAd> = new MatTableDataSource<MyAd>();

  constructor(
    private adService: AdsService
  ) {}

  ngOnInit() {
    this.getActiveAds();
  }

  getActiveAds() {
    this.adService.getMyActiveAds().then(value => {
      this.dataSourceActive = value;
    });
  }

}
