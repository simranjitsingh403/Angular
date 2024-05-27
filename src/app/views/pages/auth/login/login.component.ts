import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../api.service';
import { Usermodel } from '../../../../model/usermodel';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  result: Usermodel = new Usermodel();
  validationForm: any;
  isFormSubmitted = false;
  validationForgotForm: any;
  isForgotFormSubmitted = false;
  baseUrl: any;
  isLightChecked = localStorage.getItem('isDark') == 'true'?false:true;
  isDarkChecked = localStorage.getItem('isDark') == 'true'?true:false;
  logo = localStorage.getItem('isDark') == 'true'?"/assets/images/OneLift_white.jpeg" : "/assets/images/OneLift_black.png";
  userdetails: Usermodel = new Usermodel();

  constructor(public formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private navService: ApiService, private toastr: ToastrService,
    private modalService: NgbModal) {
    this.baseUrl = environment.baseURL;
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.validationForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      isRemember: [false],
    });

    this.validationForgotForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

    this.isForgotFormSubmitted = false;
  }


  onLoggedin() {
    if (!this.validationForm.valid) {
      this.isFormSubmitted = true;
    }
    else {
      this.navService.post<any>("Account/Login", this.validationForm.value).subscribe(d => {
        if (d.success == true) {
          this.toastr.success(d.message);
          localStorage.setItem('isLoggedin', 'true');
          if (localStorage.getItem('isLoggedin')) {
            localStorage.setItem('token', d.token);
            localStorage.setItem('userDetails', d.user);
            this.userdetails = JSON.parse(localStorage.getItem('userDetails') || "{}");

            if (this.userdetails.roleName == 'Driver') {
              this.router.navigate(["/admin/dashboard"]);
            } else if (this.userdetails.roleName == 'Owner') {
              this.router.navigate(["/admin/ownerdashboard"]);
            }
            else if (this.userdetails.roleName == 'Shipper') {
              this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || "/admin/shipperdashboard"]);
            }
            else {
              this.router.navigate([this.returnUrl]);
            }
          }
        }
        else {
          this.toastr.error(d.message)
        }
      });

    }

  }

  get form() {
    return this.validationForm.controls;
  }

  ForgotClick(model: any) {
    this.modalService.open(model)
    this.forgotform.email.setValue("");

  }

  get forgotform() {
    return this.validationForgotForm.controls;
  }

  forgotFormClick() {
    if (this.validationForgotForm.valid) {
      this.userdetails.email = this.forgotform.email.value;
      this.navService.post<any>("Account/ForgotPassword", this.userdetails).subscribe(response => this.toastr.success(response.message),
        e => this.toastr.error(e.error.title));
      this.modalService.dismissAll();
    }
    this.isForgotFormSubmitted = true;
  }


}
