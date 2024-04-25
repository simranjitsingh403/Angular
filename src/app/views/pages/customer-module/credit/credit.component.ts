import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import SignaturePad from 'signature_pad';
import { ApiService } from '../../../../api.service';
import { Customercreditmodel } from '../../../../model/customercreditmodel';
import { Customertrademodel } from '../../../../model/customertrademodel';
import { Usermodel } from '../../../../model/usermodel';
import { environment } from '../../../../../environments/environment';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, NgxMaskModule, NgbAccordionModule]
})
export class CreditComponent implements OnInit {
  @Input() states = [];
  @Input() signature: any = null;
  apiPath: string = environment.baseURL;
  validationForm: any;
  tradeForm: any;
  isFormSubmitted: Boolean = false;
  @Input() taxExemptAttachment: any = null;
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  isLightChecked = localStorage.getItem('isDark') == 'true'?false:true;
  isDarkChecked = localStorage.getItem('isDark') == 'true'?true:false;
  logo = localStorage.getItem('isDark') == 'true'?"/assets/images/OneLift_white.png" : "/assets/images/OneLift_black.png";
  isLogin = localStorage.getItem('isLoggedin') == null ? false : true;
  date = new Date();
  isTaxExempt: boolean = false;
  isInvoiceEmail: boolean = false;
  trades: Customertrademodel[] = [];
  @ViewChild('signPadCanvas', { static: false }) signaturePadElement: any;
  signPad: any;

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private spinnerService: NgxSpinnerService) { }

  ngAfterViewInit() {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      isPORequired: [false, Validators.requiredTrue],
      isTaxExempt: [],
      taxExemptAttachment: [],
      businessYears: ['', Validators.required],
      taxID: ['', Validators.required],
      companyName: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingZip: ['', Validators.required],
      shippingCityName: ['', Validators.required],
      shippingStateId: [null, Validators.required],
      billingAddress: ['', Validators.required],
      billingZip: ['', Validators.required],
      billingCityName: ['', Validators.required],
      billingStateId: [null, Validators.required],
      contactNumber: [, Validators.required],
      apcontactName: [],
      apcontactNumber: [],
      apcontactMail: [],
      invoicePreference: ["1"],
      invoiceEmail: [],
      bankName: ['', Validators.required],
      bankContactNumber: [, Validators.required],
      bankAddress: ['', Validators.required],
      bankZip: ['', Validators.required],
      bankStateId: [null, Validators.required],
      bankCityName: ['', Validators.required],
      presidentName: [],
      vicePresidentName: [],
      secretary: [],
      signature: [],
      fax: [],
      tradeRefs: new FormArray([this.formBuilder.group({
        tradeCompanyName: ['', Validators.required],
        tradeCompanyAddress: ['', Validators.required],
        tradeCompanyPhone: [, Validators.required],
        tradeCompanyFax: ['', Validators.required],
        tradeCompanyEmail: []
      }), this.formBuilder.group({
        tradeCompanyName: ['', Validators.required],
        tradeCompanyAddress: ['', Validators.required],
        tradeCompanyPhone: [, Validators.required],
        tradeCompanyFax: ['', Validators.required],
        tradeCompanyEmail: []
      }), this.formBuilder.group({
        tradeCompanyName: ['', Validators.required],
        tradeCompanyAddress: ['', Validators.required],
        tradeCompanyPhone: [, Validators.required],
        tradeCompanyFax: ['', Validators.required],
        tradeCompanyEmail: []
      })])
    });

    this.isFormSubmitted = false;
  }

  fieldsChange(event: any) {

  }

  TaxExemptChange(event: any) {
    if (event.currentTarget.checked) {
      this.isTaxExempt = true;
    }
    else {
      this.isTaxExempt = false;
    }
  }

  get form() {
    return this.validationForm.controls;
  }

  tradeFormValidations(i: any) {
    return this.validationForm.controls.tradeRefs.controls[i].controls;
  }


  UploadCertificate(file: any) {
    if (file.length === 0) {
      return;
    }

    let filesToUpload = file[0];
    const formData = new FormData();
    formData.append('file_Customer', filesToUpload, filesToUpload.name);

    this.navService.post<any>('Customer/Customer/UploadFile', formData, false, undefined, true)
      .subscribe(v => {
        this.taxExemptAttachment = v.docPath;

      }, e => { this.spinnerService.hide(); this.toastr.error(e.error.message); }, () => this.spinnerService.hide());
  }

  InvoiceEmailSelect(event: any) {
    if (event.target.value == "2") {
      this.isInvoiceEmail = true;
    } else {
      this.isInvoiceEmail = false;
    }
  }

  get tradeRefsControls() {
    return (<FormArray>this.validationForm.get('tradeRefs')).controls;
  }

  clearSignPad() {
    this.signPad.clear();
  }

  startSignPadDrawing(event: Event) {
    console.log(event);
  }

  movedFinger(event: Event) {
  }

  formSubmit(event: any) {
    if (this.validationForm.valid) { }
    this.isFormSubmitted = true;
  }

}
