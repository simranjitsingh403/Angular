import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ContentChange, SelectionChange } from 'ngx-quill';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-driver-registor',
  templateUrl: './driver-registor.component.html',
  styleUrls: ['./driver-registor.component.scss']
})
export class DriverRegistorComponent implements OnInit {
  isvalidlicense:any;
  isreferredshow:any;
  htmlText:any;
  validationForm1:UntypedFormGroup;
  validationForm2: UntypedFormGroup;
  result:any;
  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  states: any = [];
  selectedstate:any=null;
  joiningdate: NgbDateStruct;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  
  constructor(public formBuilder: UntypedFormBuilder,private navService: ApiService) { }

  ngOnInit(): void {

    this.navService.get("Diver/Account/Register").subscribe((response) => {
      this.result=response;
    })
    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      firstName : [this.result.firstName, Validators.required],
      lastName : ['', Validators.required],
      middleName : [''],
      email : ['', Validators.required],
      stateid: ['', Validators.required],
      mobileNumber : ['', Validators.required],
      islegallyallowed :['', Validators.required],
      isvalidlicense :['', Validators.required],
      licenseclassid :['', Validators.required],
      isusauthorized:['', Validators.required],
      isimmigrationallowed:['', Validators.required],
      salaryexpectation:['', Validators.required],
      jobtype:['1', Validators.required],
      referredbyname:[''],
      joiningdate :['', Validators.required],
      comments :[''],
      genderId: [''],
      raceid: [''],
      veteranid: [''],
      states:[this.result.states]
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
    debugger;
    if(this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
    this.wizardForm.goToNextStep();
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

  fieldsChange(values:any):void {
    if(values.currentTarget.checked){
      this.isvalidlicense=true;
    }
    else{
      this.isvalidlicense=false;
    }
  }

  refferChange(values:any):void {
    if(values.currentTarget.checked){
      this.isreferredshow=true;
    }
    else{
      this.isreferredshow=false;
    }
  }

  onSelectionChanged = (event: SelectionChange) => {
    if(event.oldRange == null) {
      this.onFocus();
    }
    if(event.range == null) {
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
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
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
