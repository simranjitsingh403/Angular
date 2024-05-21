import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Ownermodel } from '../../../../model/ownermodel';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Usermodel } from '../../../../model/usermodel';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  validationForm: any;
  isFormSubmitted: Boolean = false;
  apiPath: string = environment.baseURL;
  cities: any = [];
  states = [];
  newCities = [];
  result: Ownermodel = new Ownermodel();
  ownerId: any = this.route.snapshot.params['id'] == undefined ? "00000000-0000-0000-0000-000000000000" : this.route.snapshot.params['id'];
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  isLightChecked = localStorage.getItem('isDark') == 'true'?false:true;
  isDarkChecked = localStorage.getItem('isDark') == 'true'?true:false;
  logo = localStorage.getItem('isDark') == 'true'?"/assets/images/OneLift_white.png" : "/assets/images/OneLift_black.png";
  isLogin = localStorage.getItem('isLoggedin') == null ? false : true;
  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private spinnerService: NgxSpinnerService, private elementRef: ElementRef, private formService : FormService, private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      businessName: [''],
      address: ['', Validators.required],
      value: [],
      year: [],
      brandName: [],
      modal: [''],
      vinCode: [''],
      type: ['', Validators.required],
      parkingCityName: ['', Validators.required],
      stateId: ['', Validators.required],
      license: ['', Validators.required],
      parkingStateId: ['', Validators.required],
      experience: ['', Validators.required],
      dotInspection: [],
      currentRegistration: [],
      email: [, Validators.required]
    });

    this.navService.get<Ownermodel>("Owner/Owner/Register?Id=" + this.ownerId).subscribe((response) => {
      this.result = response;
    }, e => { this.toastr.error(e.message); this.spinnerService.hide(); }, () => {
      this.validationForm.patchValue({
        firstName: this.result.firstName,
        lastName: this.result.lastName,
        businessName: this.result.businessName,
        address: this.result.address,
        value: this.result.value,
        year: this.result.year,
        brandName: this.result.brandName,
        modal: this.result.modal,
        vinCode: this.result.vinCode,
        type: this.result.typeId == 0 ? '1' : this.result.typeId.toString(),
        parkingCityName: this.result.parkingCityName,
        stateId: this.result.stateId != 0 ? this.result.stateId : null,
        license: this.result.license,
        experience: this.result.experience,
        parkingStateId: this.result.parkingStateId != 0 ? this.result.parkingStateId : null,
        email: this.result.email,
      });
      this.states = this.result.states;
      this.cities = this.result.cities;

      if (this.result.parkingStateId != 0) {
        this.newCities = this.cities.filter((s: any) => s.stateId == this.result.parkingStateId);
      }

      this.spinnerService.hide();

    });
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit(event: any) {
    if (this.validationForm.valid) {
      this.result.firstName = this.form.firstName.value;
      this.result.lastName = this.form.lastName.value;
      this.result.businessName = this.form.businessName.value;
      this.result.address = this.form.address.value;
      this.result.value = this.form.value.value;
      this.result.year = this.form.year.value;
      this.result.brandName = this.form.brandName.value;
      this.result.modal = this.form.modal.value;
      this.result.vinCode = this.form.vinCode.value;
      this.result.typeId = this.form.type.value;
      this.result.parkingCityName = this.form.parkingCityName.value;
      this.result.parkingStateId = this.form.parkingStateId.value;
      this.result.stateId = this.form.stateId.value;
      this.result.license = this.form.license.value;
      this.result.experience = this.form.experience.value;
      this.result.email = this.form.email.value;
      this.result.jwtToken = localStorage.getItem('token');
      this.result.createdBy = this.userdetails.id;
      this.result.modifiedBy = this.userdetails.id;
      if (event.currentTarget.value == "submit") {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to edit your details!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Submit'
        } as SweetAlertOptions).then((sresult) => {
          if (sresult.value) {
            this.result.isSubmitted = true;
            if (this.result.id == "00000000-0000-0000-0000-000000000000") {
              this.navService.post<any>("Owner/Owner/Register", this.result).subscribe(d => { if (d.success == true) { 
                this.toastr.success(d.message,"",{timeOut:2000}).onHidden.subscribe(t => {
                  if (this.userdetails.roleName != 'Admin') {
                    window.location.href = 'https://oneliftpartners.com/';
                  } else {
                    this.router.navigate(['/admin/owners']); 
                  }
                });
              } else { this.toastr.error(d.message) } this.spinnerService.hide(); }, e => this.spinnerService.hide());
            } else {
              this.navService.put<any>("Owner/Owner/UpdateOwner", this.result).subscribe(d => { if (d.success == true) { 
                this.toastr.success(d.message).onHidden.subscribe(t => {
                  if (this.userdetails.roleName != 'Admin') {
                    this.router.navigate(['/admin/ownerdashboard']);
                  } else {
                    this.router.navigate(['/admin/owners']); 
                  }
                });
              } else { this.toastr.error(d.message) } this.spinnerService.hide(); }
                , e => this.spinnerService.hide());
            }
          }
        });

      } else {
        this.result.isSubmitted = false;
        if (this.result.id == "00000000-0000-0000-0000-000000000000") {
          this.navService.post<any>("Owner/Owner/Register", this.result).subscribe(d => { if (d.success == true) { 
            this.toastr.success(d.message,"",{timeOut:2000}).onHidden.subscribe(t => {
              if (this.userdetails.roleName != 'Admin') {
                window.location.href = 'https://oneliftpartners.com/';
              } else {
                this.router.navigate(['/admin/owners']); 
              }
            });
          } else { this.toastr.error(d.message) } this.spinnerService.hide(); }, e => this.spinnerService.hide());
        } else {
          this.navService.put<any>("Owner/Owner/UpdateOwner", this.result).subscribe(d => { if (d.success == true) { 
            this.toastr.success(d.message).onHidden.subscribe(t => {
              if (this.userdetails.roleName != 'Admin') {
                this.router.navigate(['/admin/ownerdashboard']);
              } else {
                this.router.navigate(['/admin/owners']); 
              }
            });
            } else { this.toastr.error(d.message) } this.spinnerService.hide(); }
            , e => this.spinnerService.hide());
        }
      }

    }
    this.isFormSubmitted = true;
    this.cdr.detectChanges();
    this.formService.focusInvalidElements(this.elementRef.nativeElement.querySelector('.is-invalid'));
  }

  fieldsChange(values: any): void {
    if (values.currentTarget.checked) {
    }
    else {
    }
  }

  UploadDOTInspection(file: any) {
    if (file.length === 0) {
      return;
    }

    let filesToUpload = file[0];
    const formData = new FormData();
    formData.append('file_Owner', filesToUpload, filesToUpload.name);

    this.navService.post<any>('Owner/Owner/UploadFile', formData, false, undefined, true)
      .subscribe(v => {
        this.result.dotInspectionPath = v.picPath;
        this.spinnerService.hide();
      }, e => { this.spinnerService.hide(); this.toastr.error(e.error.message); });
  }

  UploadCurrentRegistration(file: any) {
    if (file.length === 0) {
      return;
    }

    let filesToUpload = file[0];
    const formData = new FormData();
    formData.append('file_Owner', filesToUpload, filesToUpload.name);

    this.navService.post<any>('Owner/Owner/UploadFile', formData, false, undefined, true)
      .subscribe(v => {
        this.result.currentRegistrationPath = v.picPath;
        this.spinnerService.hide();
      }, e => { this.spinnerService.hide(); this.toastr.error(e.error.message); });
  }

  stateChange(value: any) {
    this.newCities = this.cities.filter((s: any) => s.stateId == value.id);
  }

}
