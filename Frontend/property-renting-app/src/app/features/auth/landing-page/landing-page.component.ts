import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { HelloRequest } from 'src/proto/generated/hello_pb';
import { grpc } from '@improbable-eng/grpc-web';
import { MyService } from 'src/proto/generated/hello_pb_service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login']);
    // const helloRequest = new HelloRequest();
    // helloRequest.setName('Lazar');
    // grpc.unary(MyService.SayHello, {
    //   request: helloRequest,
    //   host: 'http://localhost:8070',
    //   onEnd: (res) => {
    //     const { status, statusMessage, headers, message, trailers } = res;
    //     if (status === grpc.Code.OK && message) {
    //       console.log('all ok. got hello: ', message.toObject());
    //       this.toastr.success('Success!');
    //     }
    //   },
    // });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
