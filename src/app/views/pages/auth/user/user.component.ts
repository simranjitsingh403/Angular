import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Usermodel } from 'src/app/model/usermodel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  validationForm: any;
  isFormSubmitted: Boolean;
  result:Usermodel;
  roles:[];
  states:[];
  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', Validators.required],
      roleId: ['', Validators.required],
      stateId: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      genderId: [null],
    });

  }

  get form() {
    return this.validationForm.controls;
  }


  formSubmit() {
    debugger;
    if (!this.validationForm.valid) {
      this.isFormSubmitted = true;
    }

  }


}
