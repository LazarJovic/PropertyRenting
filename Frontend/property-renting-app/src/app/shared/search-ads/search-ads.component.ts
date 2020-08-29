import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchAd } from '@core/model/search-ad';
import { PropertyTypesService } from '@core/service/property-type-service/property-types.service';
import { PropertyType } from '@core/model/property-type';
import { SearchAdResult } from '@core/model/search-ad-result';

@Component({
  selector: 'app-search-ads',
  templateUrl: './search-ads.component.html',
  styleUrls: ['./search-ads.component.css']
})
export class SearchAdsComponent implements OnInit {

  searchForm: FormGroup;
  types: Array<PropertyType> = new Array<PropertyType>();
  results: Array<SearchAdResult> = new Array<SearchAdResult>();

  constructor(
    private propertyTypeService: PropertyTypesService
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      type: new FormControl(null),
      country: new FormControl(null, [Validators.maxLength(50)]),
      city: new FormControl(null, [Validators.maxLength(50)]),
      address: new FormControl(null, [Validators.maxLength(50)]),
      sizeMin: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      sizeMax: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      numberOfRoomsMin: new FormControl(null, [Validators.pattern('^[0-9]+$')]),
      numberOfRoomsMax: new FormControl(null, [Validators.pattern('^[0-9]+$')]),
      distanceFromCenterMin: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      distanceFromCenterMax: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      priceMin: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      priceMax: new FormControl(null, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      furnished: new FormControl(false),
      internetIncluded: new FormControl(false),
      airConditionIncluded: new FormControl(false)
    });

    this.propertyTypeService.getPropertyTypes().then(value => {
      this.types = value.data.map(type =>
        new PropertyType(type.id, type.name, type.description)
      );
    });
  }

  submit() {
    const searchAd: SearchAd = new SearchAd(this.searchForm.value.startDate, this.searchForm.value.endDate,
      this.searchForm.value.type.id, this.searchForm.value.guestPreference, this.searchForm.value.country,
      this.searchForm.value.city, this.searchForm.value.address, this.searchForm.value.sizeMin, this.searchForm.value.sizeMax,
      this.searchForm.value.numberOfRoomsMin, this.searchForm.value.numberOfRoomsMax,
      this.searchForm.value.distanceFromCenterMin, this.searchForm.value.distanceFromCenterMax, this.searchForm.value.priceMin,
      this.searchForm.value.priceMax, this.searchForm.value.furnished, this.searchForm.value.internetIncluded,
      this.searchForm.value.airConditionIncluded);

    console.log(searchAd);
  }

  onDetailsClicked(item: SearchAdResult) {
    // this.router.navigate([`/client-dashboard/ad/${item.id}`])
  }

}
