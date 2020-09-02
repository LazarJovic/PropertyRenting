import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdDetails } from '@core/model/ad-details';
import { NgImageSliderComponent } from 'ng-image-slider';
import { AdsService } from '@core/service/ad-service/ads.service';
import { AdImage } from '@core/model/ad-image';
import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';
import * as esriGeo from 'esri-leaflet-geocoder';
import { CheckAvailability } from '@core/model/check-availability';
import { BookingRequestsService } from '@core/service/booking-request-service/booking-requests.service';

const iconRetinaUrl = 'leaflet/marker-icon-2x.png';
const iconUrl = 'leaflet/marker-icon.png';
const shadowUrl = 'leaflet/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

// tslint:disable-next-line: no-var-keyword
var geoCodeResult: Array<any>;

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  id: number;
  ad: AdDetails;
  adImages: Array<AdImage>;
  startDate: string;
  endDate: string;
  isAvailable: boolean;
  checkedAvailability: boolean;
  minDate: string;

  map: any;

  @ViewChild('slider', { static: false }) private slider: NgImageSliderComponent;
  imageObject: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private adService: AdsService,
    private bookingRequestService: BookingRequestsService) {
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
      this.geoCode();
    });
    this.adService.getAdImages(this.id).then(value => {
      this.adImages = value;
      this.loadImages();
    });

    this.minDate = new Date(Date.now()).toISOString().split('T')[0];
    window.dispatchEvent(new Event('resize'));

    geoCodeResult = new Array<any>();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngAfterViewChecked(): void {
    if (localStorage.getItem('gotIn')) {
      this.map.setView(new L.LatLng(Number.parseFloat(localStorage.getItem('lat')), Number.parseFloat(localStorage.getItem('lng'))), 10);
      const latlng = new L.LatLng(Number.parseFloat(localStorage.getItem('lat')), Number.parseFloat(localStorage.getItem('lng')));
      L.marker(latlng).addTo(this.map);
      localStorage.removeItem('gotIn');
    }
  }

  geoCode() {
    // tslint:disable-next-line: only-arrow-functions
    esriGeo.geocode().text(this.ad.address + ', ' + this.ad.city + ', ' + this.ad.country).run(function(err, results, response) {
      if (err) {
         return;
      }
      // tslint:disable-next-line: no-string-literal
      geoCodeResult = results['results'];
      // tslint:disable-next-line: no-string-literal
      localStorage.setItem('lat', JSON.stringify(geoCodeResult[0].latlng.lat));
      // tslint:disable-next-line: no-string-literal
      localStorage.setItem('lng', JSON.stringify(geoCodeResult[0].latlng.lng));
      // tslint:disable-next-line: no-string-literal
      localStorage.setItem('gotIn', JSON.stringify(1));

     });
  }

  initMap() {
    this.map = L.map('map', {
      center: [ 0, 0 ],
      zoom: 9
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    tiles.addTo(this.map);

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

  checkAvailability() {
    const checkAvailability: CheckAvailability = new CheckAvailability(this.id, this.startDate, this.endDate);
    this.bookingRequestService.checkAdAvailability(checkAvailability).then(value => {
      this.isAvailable = value;
      this.checkedAvailability = true;
    });
  }

  datesChanged() {
    console.log(this.startDate + ' ' + this.endDate);
    this.isAvailable = false;
    this.checkedAvailability = false;
  }

}
