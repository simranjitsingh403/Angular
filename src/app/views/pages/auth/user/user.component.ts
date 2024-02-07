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
  result: Usermodel = new Usermodel();
  roles = [];
  states = [];
  userId: any = this.route.snapshot.params['id'];
  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.navService.get<Usermodel>("Account/UserRegister?Id=00000000-0000-0000-0000-000000000000").subscribe((response) => {
      this.result = response;
      
    }, e => this.toastr.error(e.message), () => {
      this.validationForm.patchValue({
        firstName: this.result.firstName,
        states: this.result.states,
        stateid: this.result.stateId != 0 ? this.result.stateId : null,
        lastName: this.result.lastName,
        middleName: this.result.middleName,
        email: this.result.email,
        mobileNumber: this.result.phoneNumber,
        roleId: this.result.roleId != "00000000-0000-0000-0000-000000000000"?this.result.roleId:null,
        stateId: this.result.stateId,
        zipCode: this.result.zipCode,
        address: this.result.address,
        userName: this.result.userName,
        profilePic: this.result.profilePicture,
      });
      this.roles = this.result.roles;
      this.states = this.result.states;
    });

    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', Validators.required],
      roleId: [null, Validators.required],
      stateId: [null, Validators.required],
      mobileNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      genderId: [null],
      profilePic: [null],
    });

  }

  get form() {
    return this.validationForm.controls;
  }


  formSubmit() {
    debugger;
    if (this.validationForm.valid) {
      this.isFormSubmitted = true;

      this.result.firstName = this.form.firstName.value;
      this.result.lastName = this.form.lastName.value;
      this.result.middleName = this.form.middleName.value;
      this.result.email = this.form.email.value;
      this.result.stateId = this.form.stateId.value;
      this.result.phoneNumber = this.form.mobileNumber.value;
      this.result.zipCode = this.form.zipCode.value;
      this.result.roleId = this.form.roleId.value;
      this.result.address = this.form.address.value;
      this.result.userName = this.form.userName.value;

      if (this.result.id == "00000000-0000-0000-0000-000000000000") {
        this.navService.post<any>("Account/UserRegister", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/user']); } else { this.toastr.error(d.message) } });
      } else {
        this.navService.put<any>("Account/UpdateUser", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/user']); } else { this.toastr.error(d.message) } });
      }
      
      
    }

  }

  UploadProfilePic(file:any){
    debugger;
    if (file.length === 0) {
      return;
    }

    let filesToUpload = file[0];
    const formData = new FormData();
    formData.append('file_User_ProfilePic', filesToUpload, filesToUpload.name);

    this.navService.post<any>('Account/UploadFile', formData, false, undefined, true)
      .subscribe(v => {
           this.result.profilePicture = v.picPath;
          
      },e => this.toastr.error(e.error.message));
  }

}
