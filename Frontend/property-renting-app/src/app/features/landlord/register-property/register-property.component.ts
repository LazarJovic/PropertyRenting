import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertyTypesService } from '@core/service/property-type-service/property-types.service';
import { PropertyType } from '@core/model/property-type';
import { Property } from '@core/model/property';
import { PropertiesService } from '@core/service/property-service/properties.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-property',
  templateUrl: './register-property.component.html',
  styleUrls: ['./register-property.component.css']
})
export class RegisterPropertyComponent implements OnInit {

  propertyForm: FormGroup;
  types: Array<PropertyType> = new Array<PropertyType>();

  imageObject: any = null;
  propertyImage: File;

  constructor(
    private propertyService: PropertiesService,
    private propertyTypeService: PropertyTypesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.propertyForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      country: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      city: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      address: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      size: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      numberOfRooms: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      distanceFromCenter: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]),
      furnished: new FormControl(false, Validators.required),
      internetIncluded: new FormControl(false, Validators.required),
      airConditionIncluded: new FormControl(false, Validators.required)
    });

    this.propertyTypeService.getPropertyTypes().then(value => {
      this.types = value.data.map(type =>
        new PropertyType(type.id, type.name, type.description)
      );
    });

  }

  submit() {
    const property: Property = new Property(0, this.propertyForm.value.type.id, this.propertyForm.value.country,
      this.propertyForm.value.city, this.propertyForm.value.address, this.propertyForm.value.size, this.propertyForm.value.numberOfRooms,
      this.propertyForm.value.distanceFromCenter, this.propertyForm.value.furnished, this.propertyForm.value.internetIncluded,
      this.propertyForm.value.airConditionIncluded);

    if (this.imageObject === null) {
      this.toastr.info('Please, choose an image for your property');
      return;
    }

    this.propertyService.registerProperty(property, this.propertyImage, this.imageObject);
  }

  onFileSelected(event) {
    if (event.target.files.length > 1) {
      this.toastr.info('You can upload maximum 1 image for property.');
      return;
    }
    for (const file of event.target.files) {
      this.propertyImage = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageObject = reader.result;
      };
    }
  }

  trackByFn(index, item) {
    return item.id;
 }

}
