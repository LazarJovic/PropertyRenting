import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rating } from '@core/model/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(
    private toastr: ToastrService
  ) { }

  rateAd(rating: Rating) {

  }

}
