import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { MatDialog } from '@angular/material/dialog';
import { ChoosePropertyDialogComponent } from '../choose-property-dialog/choose-property-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChooseProperty } from '@core/model/choose-property';
import { resolve } from 'url';

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
  adImageFiles: Array<File>;

  constructor(
    private choosePropertyDialog: MatDialog,
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
    console.log(this.adForm.value);
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
        console.log(result);
        this.choosenProperty = result.property;
        this.adForm.patchValue({
          property: this.choosenProperty.address + ', ' + this.choosenProperty.city + ', ' + this.choosenProperty.country
        });
      }
    });
  }

  onFileSelected(event) {
    if (event.target.files.length > 8) {
      // this.toast.info("You can upload maximum 8 images for ad.");
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
        if (this.imageObject.length + 1 <= 8) {
          this.imageObject.push(obj);
        } else {
          // this.toast.info("You can upload maximum 8 images for ad.");
          return;
        }
      };
    }
  }

}
