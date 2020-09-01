import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MyAd } from '@core/model/my-ad';
import { AdService } from 'src/proto/ad/ad_pb_service';
import { AdsService } from '@core/service/ad-service/ads.service';
import { Router } from '@angular/router';

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
  dataSourceInactive: MatTableDataSource<MyAd> = new MatTableDataSource<MyAd>();

  constructor(
    private adService: AdsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getActiveAds();
    this.getInactiveAds();
  }

  getActiveAds() {
    this.adService.getMyActiveAds().then(value => {
      this.dataSourceActive = value;
    });
  }

  getInactiveAds() {
    this.adService.getMyInactiveAds().then(value => {
      this.dataSourceInactive = value;
    });
  }

  details(ad) {
    this.router.navigate([`landlord/ad/${ad.id}`]);
  }

  delete(ad) {
    this.adService.deleteAd(ad.id);
    setTimeout(() => {
      this.getActiveAds();
      this.getInactiveAds();
    }, 300);
  }

}
