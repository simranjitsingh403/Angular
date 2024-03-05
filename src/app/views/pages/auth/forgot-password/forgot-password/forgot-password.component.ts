import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Usermodel } from 'src/app/model/usermodel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  validationForm: any;
  isFormSubmitted = false;
  baseUrl: any;
  logo = "/assets/images/OneLift_white.png";
  user: Usermodel = new Usermodel();
  isPasswordNotValid: boolean = false;
  isPasswordNotMatch: boolean = false;

  constructor(public formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private navService: ApiService, private toastr: ToastrService) {
    this.baseUrl = environment.baseURL;
  }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      email: [, Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)]],
      confirmPassword: ['', Validators.required],
    });
  }

  get form() {
    return this.validationForm.controls;
  }

  onSubmit() {
    if (this.validationForm.controls.password.errors != null) {
      this.isPasswordNotValid = true
    }
    if (this.validationForm.valid) {
      this.user.email = this.form.email.value;
      this.user.password = this.form.password.value;
      this.user.confirmPassword = this.form.confirmPassword.value;
      this.user.passwordToken = this.route.snapshot.queryParams['token']
      this.navService.post<any>("Account/PasswordReset", this.user).subscribe(response => this.toastr.success(response.message),
        e => this.toastr.error(e.error.message), () => {
          this.router.navigateByUrl("/auth/login");
        });
    }
    this.isFormSubmitted = true;
  }

  SigninClick() {
    this.router.navigateByUrl("/auth/login");
  }

  PasswordChange(event: any) {
    if (this.form.password.value != event.target.value) {
      this.isPasswordNotMatch = true;
      this.validationForm.controls['confirmPassword'].setErrors({ 'incorrect': true });
    }

  }

}
