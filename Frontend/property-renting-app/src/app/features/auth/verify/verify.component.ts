import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  verifyForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.verifyForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      // tslint:disable-next-line: quotemark
      token: new FormControl(null, [Validators.required, Validators.pattern("^[a-zšđćčžA-ZŠĐŽČĆ0-9\'\"_\\- ]*$")])
    });
  }

  submit() {

  }

}
