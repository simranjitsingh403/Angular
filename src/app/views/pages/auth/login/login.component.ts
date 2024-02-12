import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Usermodel } from 'src/app/model/usermodel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  result: Usermodel;
  validationForm: any;
  isFormSubmitted = false;
  baseUrl:any;
  constructor(public formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private navService: ApiService, private toastr: ToastrService) {
    this.baseUrl=environment.baseURL;
   }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.validationForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      isRemember: [false],
    });
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
            this.router.navigate([this.returnUrl]);
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

}
