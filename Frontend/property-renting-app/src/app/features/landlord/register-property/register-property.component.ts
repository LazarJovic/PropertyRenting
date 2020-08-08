import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-property',
  templateUrl: './register-property.component.html',
  styleUrls: ['./register-property.component.css']
})
export class RegisterPropertyComponent implements OnInit {

  imageObject: any = null;
  vehicleImage: File;

  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event) {
    if (event.target.files.length > 1) {
      // this.toast.info("You can upload maximum 1 image for vehicle.");
      return;
    }
    for (const file of event.target.files) {
      this.vehicleImage = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageObject = reader.result;
      };
    }
  }

}
