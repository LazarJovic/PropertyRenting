import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RateDialogData } from '@features/auth/ad-details/ad-details.component';
import { Rating } from '@core/model/rating';
import { RatingsService } from '@core/service/rating-service/ratings.service';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.css']
})
export class RateDialogComponent implements OnInit {

  propertyRating: number;

  constructor(
    public dialogRef: MatDialogRef<RateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RateDialogData,
    private ratingService: RatingsService
  ) { }

  ngOnInit() {
    this.propertyRating = this.data.averageRating;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  rate() {
    const rating: Rating = new Rating(0, this.propertyRating, this.data.requestId, this.data.adId, this.data.propertyId,
       this.data.averageRating);
    this.ratingService.rateAd(rating);
  }

}
