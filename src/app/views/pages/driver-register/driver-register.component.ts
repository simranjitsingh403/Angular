import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ContentChange, SelectionChange } from 'ngx-quill';
import { ApiService } from 'src/app/api.service';
import { Drivermodel } from 'src/app/model/drivermodel';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-driver-registor',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.scss']
})
export class DriverRegistorComponent implements OnInit {
  isvalidlicense: any;
  isreferredshow: any;
  validationForm1: any;
  validationForm2: UntypedFormGroup;
  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  firstName: string;
  result: Drivermodel;
  selectedstate: any = null;
  joiningdate: NgbDateStruct;
  genders:any=[];
  races:any=[];
  veteran:any=[];
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;


  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.navService.get<Drivermodel>("Diver/Account/Register").subscribe((response) => {
      this.result = response;
    }, e => this.toastr.error(e.message), () => {
      this.validationForm1.patchValue({
        firstName: this.result.firstName,
        states: this.result.states,
        stateid: this.result.stateId != 0 ? this.result.stateId : null,
        lastName: this.result.lastName,
        middleName: this.result.middleName,
        email: this.result.email,
        mobileNumber: this.result.phoneNumber,
        islegallyallowed: this.result.isLegallyAllowed,
        isvalidlicense: this.result.licenseClassId != 0 ? true : false,
        licenseclassid: this.result.licenseClassId != 0? this.result.licenseClassId : null,
        isusauthorized: this.result.isUSAuthorized,
        isimmigrationallowed: this.result.isImmigrationAllowed,
        salaryexpectation: this.result.salaryExpectation,
        jobtype: this.result.jobType != 0? this.result.jobType.toString() : '1',
        referredbyname: this.result.referredByName,
        joiningdate: this.result.joiningDate,
        comments: this.result.comments,
        genderId: this.result.genderId,
        raceid: this.result.raceId,
        veteranid: this.result.veteranId,
        licenseClasses: this.result.licenseClasses,
        jobTypes: this.result.jobTypes,
        genders: this.result.genders,
        races: this.result.races,
        veteran: this.result.veteran,
        isreferredshow: this.result.referredByName != null? true : false
      });
      this.genders=this.result.genders;
      this.races=this.result.races;
      this.veteran=this.result.veteran;
      this.isvalidlicense = this.result.licenseClassId != 0 ? true : false;
      this.isreferredshow = this.result.referredByName != null? true : false;
    });
    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', Validators.required],
      stateid: ['0', Validators.required],
      mobileNumber: ['', Validators.required],
      islegallyallowed: ['', Validators.required],
      isvalidlicense: ['', Validators.required],
      licenseclassid: ['', Validators.required],
      isusauthorized: ['', Validators.required],
      isimmigrationallowed: ['', Validators.required],
      salaryexpectation: ['', Validators.required],
      jobtype: ['1', Validators.required],
      referredbyname: [''],
      joiningdate: ['', Validators.required],
      comments: [''],
      genderId: [''],
      raceid: [''],
      veteranid: [''],
      isreferredshow : []
    });
    
    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({

    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
  }
 
  /**
   * Wizard finish function
   */
  finishFunction() {
    this.result.firstName = this.form1.firstName.value;
    this.result.lastName = this.form1.lastName.value;
    this.result.middleName = this.form1.middleName.value;
    this.result.email = this.form1.email.value;
    this.result.stateId = this.form1.stateid.value;
    this.result.phoneNumber = this.form1.mobileNumber.value;
    this.result.isLegallyAllowed = this.form1.islegallyallowed.value;
    this.result.licenseClassId = this.form1.licenseclassid.value;
    this.result.isUSAuthorized = this.form1.isusauthorized.value;
    this.result.isImmigrationAllowed = this.form1.isimmigrationallowed.value;
    this.result.salaryExpectation = this.form1.salaryexpectation.value;
    this.result.jobType = this.form1.jobtype.value;
    this.result.referredByName = this.form1.referredbyname.value;
    this.result.joiningDate = this.form1.joiningdate.value;
    this.result.comments = this.form1.comments.value;
    this.result.genderId = this.form1.genderId.value;
    this.result.raceId = this.form1.raceid.value;
    this.result.veteranId = this.form1.veteranid.value;

    if(this.result.id == "00000000-0000-0000-0000-000000000000"){
      this.navService.post("Diver/Account/Register",this.result).subscribe(d => console.log(d));
    }else{
      this.navService.put("Diver/Account/UpdateDriver",this.result).subscribe(d => console.log(d));
    }
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
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
    this.wizardForm.goToNextStep();
  }

  /**
   * Go to next step while form value is valid
   */
  form2Submit() {
    if (this.validationForm2.valid) {
      this.wizardForm.goToNextStep();
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


}
