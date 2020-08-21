import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterRequestsService } from '@core/service/register-request-service/register-requests.service';
import { EmailVerification } from '@core/model/email-verification';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  verifyForm: FormGroup;

  constructor(
    private registerRequestService: RegisterRequestsService
  ) { }

  ngOnInit() {
    this.verifyForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      // tslint:disable-next-line: quotemark
      token: new FormControl(null, [Validators.required, Validators.pattern("^[a-zšđćčžA-ZŠĐŽČĆ0-9\'\"_\\- ]*$")])
    });
  }

  submit() {

    const emailVerification: EmailVerification = new EmailVerification(this.verifyForm.value.email, this.verifyForm.value.token);

    this.registerRequestService.verifyEmail(emailVerification);
  }

}
