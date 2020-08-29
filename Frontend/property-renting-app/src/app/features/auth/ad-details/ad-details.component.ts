import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdDetails } from '@core/model/ad-details';
import { NgImageSliderComponent } from 'ng-image-slider';
import { AdsService } from '@core/service/ad-service/ads.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  id: number;
  ad: AdDetails;

  @ViewChild('slider', { static: false }) private slider: NgImageSliderComponent;
  imageObject: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private adService: AdsService) {
    const temp: Observable<number> = route.params.pipe(map(p => p.id));
    temp.subscribe(id => {
      if (id) {
        this.id = id;
      }
    });
  }

  ngOnInit() {
    this.adService.getAdDetails(this.id).then(value => {
      this.ad = value;
    });
  }

}
