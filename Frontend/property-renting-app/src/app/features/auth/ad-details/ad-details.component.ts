import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdDetails } from '@core/model/ad-details';
import { NgImageSliderComponent } from 'ng-image-slider';
import { AdsService } from '@core/service/ad-service/ads.service';
import { AdImage } from '@core/model/ad-image';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  id: number;
  ad: AdDetails;
  adImages: Array<AdImage>;
  startDateTime: string;
  endDateTime: string;
  isAvailable: boolean;
  checkedAvailability: boolean;
  minDate: string;

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
    this.adService.getAdImages(this.id).then(value => {
      this.adImages = value;
      this.loadImages();
      console.log(this.imageObject);
    });

    this.minDate = new Date(Date.now()).toISOString().split('T')[0];
  }

  loadImages() {
    for (const adImage of this.adImages) {
      const file = 'data:image/jpeg;base64,' + adImage.picByte;
      let obj;
      obj = {
        image: file, thumbImage: file
      };
      this.imageObject.push(obj);
    }
  }

  datesChanged() {
    this.isAvailable = false;
    this.checkedAvailability = false;
  }

}
