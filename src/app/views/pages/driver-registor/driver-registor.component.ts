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
  templateUrl: './driver-registor.component.html',
  styleUrls: ['./driver-registor.component.scss']
})
export class DriverRegistorComponent implements OnInit {
  isvalidlicense: any;
  isreferredshow: any;
  htmlText: any;
  validationForm1: any;
  validationForm2: UntypedFormGroup;
  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  firstName: string;
  result: Drivermodel;
  states: any = [];
  selectedstate: any = null;
  joiningdate: NgbDateStruct;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;


  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.navService.get<Drivermodel>("Diver/Account/Register").subscribe((response) => {
      this.result = response;
    }, e => this.toastr.error(e.message), () => {
      this.validationForm1.patchValue({
        firstName: this.result.firstName,
        states: this.result.states,
        stateid: this.result.stateId,
        lastName: this.result.lastName,
        middleName: this.result.middleName,
        email: this.result.email,
        mobileNumber: this.result.phoneNumber,
        islegallyallowed: this.result.isLegallyAllowed,
        isvalidlicense: this.result.licenseClassId != null ? true : false,
        licenseclassid: this.result.licenseClassId,
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
      this.isvalidlicense = this.result.licenseClassId != null ? true : false;
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

      password: ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
  }
 
  /**
   * Wizard finish function
   */
  finishFunction() {
    alert('Successfully Completed');
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
    }
  }

  refferChange(values: any): void {
    if (values.currentTarget.checked) {
      this.isreferredshow = true;
    }
    else {
      this.isreferredshow = false;
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
