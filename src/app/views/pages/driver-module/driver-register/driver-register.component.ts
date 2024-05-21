import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {MatStepper, MatStepperIcon} from '@angular/material/stepper'
import { ContentChange, SelectionChange } from 'ngx-quill';
import { ApiService } from '../../../../api.service';
import { Drivermodel } from '../../../../model/drivermodel';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Usermodel } from '../../../../model/usermodel';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-driver-registor',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.scss']
})
export class DriverRegistorComponent implements OnInit {
  isvalidlicense: any;
  isreferredshow: any;
  validationForm1: any;
  validationForm2: any;
  isForm1Submitted: Boolean = false;
  isForm2Submitted: Boolean = false;
  result: Drivermodel = new Drivermodel();
  selectedstate: any = null;
  joiningdate: any;
  genders: any = [];
  races: any = [];
  veteran: any = [];
  documentTypeId: number = 1;
  apiPath: string = environment.baseURL;
  driverId: any = this.route.snapshot.params['id'] == undefined ? "00000000-0000-0000-0000-000000000000" : this.route.snapshot.params['id'];
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  @ViewChild('wizardForm') wizardForm!: BaseWizardComponent;
  isLightChecked = localStorage.getItem('isDark') == 'true'?false:true;
  isDarkChecked = localStorage.getItem('isDark') == 'true'?true:false;
  logo = localStorage.getItem('isDark') == 'true'?"/assets/images/OneLift_white.png" : "/assets/images/OneLift_black.png";
  isLogin = localStorage.getItem('isLoggedin') == null ? false : true;
  @ViewChild('stepper') stepper!: MatStepper;
  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private spinnerService: NgxSpinnerService, private elementRef: ElementRef, private formService : FormService, private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.driverId) {
      this.driverId = "00000000-0000-0000-0000-000000000000";
    }
    
    this.navService.get<Drivermodel>("Driver/Account/Register?Id=" + this.driverId).subscribe((response) => {
      this.result = response;
    }, e => { this.toastr.error(e.message); this.spinnerService.hide(); }, () => {
      this.validationForm1.patchValue({
        firstName: this.result.firstName,
        states: this.result.states,
        stateid: this.result.stateId != 0 ? this.result.stateId : null,
        lastName: this.result.lastName,
        middleName: this.result.middleName,
        email: this.result.email,
        mobileNumber: this.result.phoneNumber,
        islegallyallowed: this.driverId == "00000000-0000-0000-0000-000000000000" ? '' : this.result.isLegallyAllowed,
        isvalidlicense: this.driverId == "00000000-0000-0000-0000-000000000000" ? '' : (this.result.licenseClassId != 0 ? true : false),
        licenseclassid: this.result.licenseClassId != 0 ? this.result.licenseClassId : null,
        isusauthorized: this.driverId == "00000000-0000-0000-0000-000000000000" ? '' : this.result.isUSAuthorized,
        isimmigrationallowed: this.result.isImmigrationAllowed == true ? '1' : '2',
        salaryexpectation: this.driverId == "00000000-0000-0000-0000-000000000000" ? '' : this.result.salaryExpectation,
        jobtype: this.result.jobType != 0 ? this.result.jobType.toString() : '1',
        referredbyname: this.result.referredByName,
        joiningdate: this.result.joiningDate,
        comments: this.result.comments,
        genderId: this.result.genderId != 0 ? this.result.genderId : null,
        raceid: this.result.raceId != 0 ? this.result.raceId : null,
        veteranid: this.result.veteranId != 0 ? this.result.veteranId : null,
        licenseClasses: this.result.licenseClasses,
        jobTypes: this.result.jobTypes,
        genders: this.result.genders,
        races: this.result.races,
        veteran: this.result.veteran,
        isreferredshow: this.result.referredByName != null ? true : false
      });

      this.genders = this.result.genders;
      this.races = this.result.races;
      this.veteran = this.result.veteran;
      this.isvalidlicense = this.result.licenseClassId != 0 ? true : false;
      this.isreferredshow = this.result.referredByName != null ? true : false;

      if (this.result.documents.length > 0) {
        this.validationForm2.controls['documents'].setErrors(null);
      }

      this.spinnerService.hide();

    });
    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', Validators.required],
      stateid: ['0', Validators.required],
      mobileNumber: ['', Validators.required],
      islegallyallowed: ['', Validators.requiredTrue],
      isvalidlicense: ['', Validators.requiredTrue],
      licenseclassid: ['', Validators.required],
      isusauthorized: ['', Validators.requiredTrue],
      isimmigrationallowed: [''],
      salaryexpectation: ['', Validators.required],
      jobtype: ['', Validators.required],
      referredbyname: [''],
      joiningdate: ['', Validators.required],
      comments: [''],
      genderId: [null],
      raceid: [null],
      veteranid: [null],
      isreferredshow: [],
    });

    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({
      documents: ['', [Validators.required]]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
  }

  /**
   * Wizard finish function
   */
  finishFunction(event: any) {
    if (this.validationForm1.valid && this.validationForm2.valid) {
      this.result.firstName = this.form1.firstName.value;
      this.result.lastName = this.form1.lastName.value;
      this.result.middleName = this.form1.middleName.value;
      this.result.email = this.form1.email.value;
      this.result.stateId = this.form1.stateid.value;
      this.result.phoneNumber = this.form1.mobileNumber.value;
      this.result.isLegallyAllowed = this.form1.islegallyallowed.value;
      this.result.licenseClassId = this.form1.licenseclassid.value;
      this.result.isUSAuthorized = this.form1.isusauthorized.value;
      this.result.isImmigrationAllowed = this.form1.isimmigrationallowed.value == '1' ? true : false;
      this.result.salaryExpectation = this.form1.salaryexpectation.value;
      this.result.jobType = this.form1.jobtype.value;
      this.result.referredByName = this.form1.referredbyname.value;
      this.result.joiningDate = this.form1.joiningdate.value;
      this.result.comments = this.form1.comments.value;
      this.result.genderId = this.form1.genderId.value;
      this.result.raceId = this.form1.raceid.value;
      this.result.veteranId = this.form1.veteranid.value;
      this.result.jwtToken = localStorage.getItem('token');

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
              this.navService.post<any>("Driver/Account/Register", this.result).subscribe(d => { if (d.success == true) { 
                this.toastr.success(d.message,"",{timeOut:2000}).onHidden.subscribe(t => {
                  if (this.userdetails.roleName != 'Admin') {
                    window.location.href = 'https://oneliftpartners.com/';
                  } else {
                    this.router.navigate(['/admin/drivers']);
                  }
                });
              } else { this.toastr.error(d.message) } this.spinnerService.hide(); }, e => this.spinnerService.hide());
            } else {
              this.navService.put<any>("Driver/Account/UpdateDriver", this.result).subscribe(d => {
                if (d.success == true) {
                  this.toastr.success(d.message).onHidden.subscribe(t => {
                    if (this.userdetails.roleName != 'Admin') {
                      this.router.navigate(['/admin/dashboard']);
                    } else {
                      this.router.navigate(['/admin/drivers']);
                    }
                  });
                } else { this.toastr.error(d.message) }
                this.spinnerService.hide();
              }, e => this.spinnerService.hide());
            }
          }
        });

      } else {
        this.result.isSubmitted = false;
        if (this.result.id == "00000000-0000-0000-0000-000000000000") {
          this.navService.post<any>("Driver/Account/Register", this.result).subscribe(d => { if (d.success == true) { 
            this.toastr.success(d.message,"",{timeOut:2000}).onHidden.subscribe(t => {
              if (this.userdetails.roleName != 'Admin') {
                window.location.href = 'https://oneliftpartners.com/';
              } else {
                this.router.navigate(['/admin/drivers']);
              }
            }); 
          } else { this.toastr.error(d.message) } this.spinnerService.hide(); }, e => this.spinnerService.hide());
        } else {
          this.navService.put<any>("Driver/Account/UpdateDriver", this.result).subscribe(d => {
            if (d.success == true) {
              this.toastr.success(d.message).onHidden.subscribe(t => {
                if (this.userdetails.roleName != 'Admin') {
                  this.router.navigate(['/admin/dashboard']);
                } else {
                  this.router.navigate(['/admin/drivers']);
                }
              });
            } else { this.toastr.error(d.message) }
            this.spinnerService.hide();
          }, e => this.spinnerService.hide());
        }
      }
    }
    this.isForm1Submitted = true;
    this.isForm2Submitted = true;
    this.cdr.detectChanges();
    this.formService.focusInvalidElements(this.elementRef.nativeElement.querySelector('.is-invalid'));
  }

  /**
   * Returns form
   */
  get form1() {
    return this.validationForm1.controls;
  }

  /**
   * Returns form
   */
  get form2() {
    return this.validationForm2.controls;
  }

  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    debugger;
    if (this.validationForm1.valid) {
      this.stepper.next();
    }
    this.isForm1Submitted = true;
    this.cdr.detectChanges();
    this.formService.focusInvalidElements(this.elementRef.nativeElement.querySelector('.is-invalid'));
  }

  /**
   * Go to next step while form value is valid
   */
  form2Submit() {
    if (this.validationForm2.valid) {
      this.stepper.next();
    }
    this.isForm2Submitted = true;
  }

  fieldsChange(values: any): void {
    if (values.currentTarget.checked) {
      this.isvalidlicense = true;
    }
    else {
      this.isvalidlicense = false;
      this.form1.licenseclassid.value = null;
      this.form1.stateid.value = null;
    }
  }

  refferChange(values: any): void {
    if (values.currentTarget.checked) {
      this.isreferredshow = true;
    }
    else {
      this.isreferredshow = false;
      this.form1.referredbyname.value = null;
    }
  }

  onSelectionChanged = (event: SelectionChange) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }
  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        //['link', 'image', 'video']
      ],
    },
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let filesToUpload = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file: any, index: number) => {
      return formData.append('file_Driver_' + this.documentTypeId, file, file.name);
    });

    this.navService.post<any>('Driver/Account/UploadFiles', formData, false, undefined, true)
      .subscribe(v => {
        for (let i = 0; i < v.length; i++) {
          this.result.documents.push(v[i]);
        }
        this.spinnerService.hide();
      }, e => this.spinnerService.hide());
  }

  DeleteDocument(index: any) {
    this.result.documents.splice(index, 1);

    if (this.result.documents.length == 0) {
      this.validationForm2.controls['documents'].setErrors({ require: true });
    }
  }

}
