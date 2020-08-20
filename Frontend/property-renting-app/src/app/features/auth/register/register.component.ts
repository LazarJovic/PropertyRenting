import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequestsService } from '@core/service/register-request-service/register-requests.service';
import { RegisterRequest } from '@core/model/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private registerRequestService: RegisterRequestsService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      postcode: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, Validators.required),
      landlord: new FormControl(false, Validators.required)
    });
  }

  submit() {

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.toastr.info('Passwords do not match');
    } else {
      const registerRequest: RegisterRequest = new RegisterRequest(0, this.registerForm.value.firstName, this.registerForm.value.surname,
        this.registerForm.value.email, this.registerForm.value.phone, this.registerForm.value.country, this.registerForm.value.city,
        this.registerForm.value.address, this.registerForm.value.postcode, this.registerForm.value.password,
        this.registerForm.value.confirmPassword, this.registerForm.value.landlord);

      this.registerRequestService.createRegisterRequest(registerRequest);
    }
  }

}
