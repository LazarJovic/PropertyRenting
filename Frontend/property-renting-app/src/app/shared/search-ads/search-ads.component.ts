import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-ads',
  templateUrl: './search-ads.component.html',
  styleUrls: ['./search-ads.component.css']
})
export class SearchAdsComponent implements OnInit {

  searchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      type: new FormControl(null),
      guestPreference: new FormControl(null),
      country: new FormControl(null, [Validators.maxLength(50)]),
      city: new FormControl(null, [Validators.maxLength(50)]),
      address: new FormControl(null, [Validators.maxLength(50)]),
      size: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      numberOfRooms: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      distanceFromCenter: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      priceMin: new FormControl(null, [Validators.pattern('^[0-9]+$')]),
      priceMax: new FormControl(null, [Validators.pattern('^[0-9]+$')]),
      furnished: new FormControl(false),
      internetIncluded: new FormControl(false),
      airConditionIncluded: new FormControl(false)
    });
  }

}
