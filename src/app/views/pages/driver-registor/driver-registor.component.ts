import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-driver-registor',
  templateUrl: './driver-registor.component.html',
  styleUrls: ['./driver-registor.component.scss']
})
export class DriverRegistorComponent implements OnInit {

  validationForm1: UntypedFormGroup;
  validationForm2: UntypedFormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  states: any = [];
  selectedstate:any=null;
  joiningdate: NgbDateStruct;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  constructor(public formBuilder: UntypedFormBuilder,private calendar: NgbCalendar) { }

  ngOnInit(): void {

    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      middleName : [''],
      email : ['', Validators.required],
      stateid: ['', Validators.required],
      mobileNumber : ['', Validators.required],
      islegallyallowed :['', Validators.required],
      licenseclassid :['', Validators.required],
      isusauthorized:['', Validators.required],
      isimmigrationallowed:['', Validators.required],
      salaryexpectation:['', Validators.required],
      jobtype:['', Validators.required],
      referredbyname:[''],
      joiningdate :['', Validators.required],
      comments :[''],
      genderId: [''],
      raceid: [''],
      veteranid: [''],
    });

    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({
     
      password : ['', Validators.required]
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
    if(this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  /**
   * Go to next step while form value is valid
   */
  form2Submit() {
    if(this.validationForm2.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }


}
