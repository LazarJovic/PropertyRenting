import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { MatDialog } from '@angular/material/dialog';
import { ChoosePropertyDialogComponent } from '../choose-property-dialog/choose-property-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChooseProperty } from '@core/model/choose-property';
import { resolve } from 'url';
import { AdsService } from '@core/service/ad-service/ads.service';
import { ToastrService } from 'ngx-toastr';
import { Ad } from '@core/model/ad';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  adForm: FormGroup;
  choosenProperty: ChooseProperty;
  minDate: string;
  durationLimited: false;

  @ViewChild('slider', { static: false }) private slider: NgImageSliderComponent;
  imageObject: Array<object> = [];
  images: Array<any> = new Array<any>();
  adImageFiles: Array<File>;

  constructor(
    private choosePropertyDialog: MatDialog,
    private toastr: ToastrService,
    private adService: AdsService
  ) { }

  ngOnInit() {

    this.minDate = new Date(Date.now()).toISOString().split('T')[0];

    this.adImageFiles = new Array<File>();

    this.adForm = new FormGroup({
      property: new FormControl(null, Validators.required),
      durationLimited: new FormControl(false, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      guestPreference: new FormControl(null, Validators.required),
      pricePerNight: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      securityDeposit: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      additionalInfo: new FormControl(null, [Validators.required, Validators.maxLength(500)])
    });

  }

  submit() {
    const ad: Ad = new Ad(0, this.choosenProperty.id, this.adForm.value.durationLimited, this.adForm.value.startDate,
       this.adForm.value.endDate, this.adForm.value.guestPreference, this.adForm.value.pricePerNight,
       this.adForm.value.securityDeposit, this.adForm.value.additionalInfo);

    this.adService.createAd(ad, this.images);
  }

  durationLimitedChange() {
    if (!this.durationLimited && this.adForm.value.endDate != null) {
      this.adForm.patchValue({
        endDate: null
      });
    }
  }

  chooseProperty() {
    const dialogRef = this.choosePropertyDialog.open(ChoosePropertyDialogComponent, {
      width: '80vw',
      height: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.choosenProperty = result.property;
        this.adForm.patchValue({
          property: this.choosenProperty.address + ', ' + this.choosenProperty.city + ', ' + this.choosenProperty.country
        });
      }
    });
  }

  onFileSelected(event) {
    if (event.target.files.length > 8) {
      this.toastr.info('You can upload maximum 8 images for ad.');
      return;
    }
    for (const file of event.target.files) {
      this.adImageFiles.push(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let obj;
        obj = {
          image: reader.result, thumbImage: reader.result
        };
        let imageMessageObj;
        imageMessageObj = {
          image: reader.result, name: file.name, type: file.type
        };
        if (this.imageObject.length + 1 <= 8) {
          this.imageObject.push(obj);
          this.images.push(imageMessageObj);
        } else {
          this.toastr.info('You can upload maximum 8 images for ad.');
          return;
        }
      };
    }
  }

}
