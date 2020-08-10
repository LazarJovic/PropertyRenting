import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { MatDialog } from '@angular/material/dialog';
import { ChoosePropertyDialogComponent } from '../choose-property-dialog/choose-property-dialog.component';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  @ViewChild('slider', { static: false }) private slider: NgImageSliderComponent;
  imageObject: Array<object> = [];
  adImageFiles: Array<File>;

  constructor(
    private choosePropertyDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.adImageFiles = new Array<File>();
  }

  chooseProperty() {
    const dialogRef = this.choosePropertyDialog.open(ChoosePropertyDialogComponent, {
      width: '80vw',
      height: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {

      // if (result) {
      //   this.chosenVehicle = result.vehicle;
      //   this.createAdForm.patchValue({
      //     "vehicle": this.chosenVehicle.brand + " " + this.chosenVehicle.model + ", " + this.chosenVehicle.yearBuilt
      //   });
      // }
      console.log('Uspesno zatvoren dijalog!');
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
