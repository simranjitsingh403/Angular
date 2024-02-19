import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Usermodel } from 'src/app/model/usermodel';
import { Customercreditmodel } from 'src/app/model/customercreditmodel';
import { Customertrademodel } from 'src/app/model/customertrademodel';

@Component({
  selector: 'app-customer-credit',
  templateUrl: './customer-credit.component.html',
  styleUrls: ['./customer-credit.component.scss']
})
export class CustomerCreditComponent implements OnInit {
  validationForm: any;
  tradeForm: any;
  isFormSubmitted: Boolean;
  result: Customercreditmodel = new Customercreditmodel();
  apiPath: string = environment.baseURL;
  customerId: any = this.route.snapshot.params['id'] == undefined ? "00000000-0000-0000-0000-000000000000" : this.route.snapshot.params['id'];
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  logo = "/assets/images/OneLift_black.png";
  isLogin = localStorage.getItem('isLoggedin') == null ? false : true;
  date = new Date();
  isTaxExempt: boolean;
  isInvoiceEmail: boolean;
  cities: any = [];
  states = [];
  shippingCities = [];
  billingCities = [];
  bankCities = [];
  trades: Customertrademodel[] = [];

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      isPORequired: [, Validators.required],
      isTaxExempt: [],
      taxExemptAttachment: [],
      businessYears: [, Validators.required],
      taxID: [, Validators.required],
      companyName: [, Validators.required],
      shippingAddress: [, Validators.required],
      shippingZip: [, Validators.required],
      shippingCityId: [, Validators.required],
      shippingStateId: [, Validators.required],
      billingAddress: [, Validators.required],
      billingZip: [, Validators.required],
      billingCityId: [, Validators.required],
      billingStateId: [, Validators.required],
      contactNumber: [],
      apcontactName: [],
      apcontactNumber: [],
      apcontactMail: [],
      invoicePreference: ["1"],
      invoiceEmail: [],
      bankName: [, Validators.required],
      bankContactNumber: [, Validators.required],
      bankAddress: [, Validators.required],
      bankZip: [, Validators.required],
      bankStateId: [, Validators.required],
      bankCityId: [, Validators.required],
      presidentName: [],
      vicePresidentName: [],
      secretary: [],
      signature: [],
      fax: [],
      tradeRefs: new FormArray([this.formBuilder.group({
        tradeCompanyName: [, Validators.required],
        tradeCompanyAddress: [, Validators.required],
        tradeCompanyPhone: [, Validators.required],
        tradeCompanyFax: [, Validators.required],
        tradeCompanyEmail: []
      }), this.formBuilder.group({
        tradeCompanyName: [, Validators.required],
        tradeCompanyAddress: [, Validators.required],
        tradeCompanyPhone: [, Validators.required],
        tradeCompanyFax: [, Validators.required],
        tradeCompanyEmail: []
      }), this.formBuilder.group({
        tradeCompanyName: [, Validators.required],
        tradeCompanyAddress: [, Validators.required],
        tradeCompanyPhone: [, Validators.required],
        tradeCompanyFax: [, Validators.required],
        tradeCompanyEmail: []
      })])
    });

    this.navService.get<Customercreditmodel>("Customer/Customer/CustomerCredit?Id=" + this.customerId).subscribe((response) => {
      this.result = response;

    }, e => this.toastr.error(e.message), () => {
      this.validationForm.patchValue({
      });

      this.cities = this.result.cities;
      this.states = this.result.states;
    });
    this.isFormSubmitted = false;
  }

  formSubmit() {
    this.trades = [];
    if (this.validationForm.valid) {
    this.result.customerId = this.userdetails.customerId;
    this.result.isPORequired = this.form.isPORequired.value;
    this.result.businessYears = this.form.businessYears.value;
    this.result.taxID = this.form.taxID.value;
    this.result.companyName = this.form.companyName.value;
    this.result.shippingAddress = this.form.shippingAddress.value;
    this.result.shippingZip = this.form.shippingZip.value;
    this.result.shippingStateId = this.form.shippingStateId.value;
    this.result.shippingCityId = this.form.shippingCityId.value;
    this.result.billingAddress = this.form.billingAddress.value;
    this.result.billingZip = this.form.billingZip.value;
    this.result.billingCityId = this.form.billingCityId.value;
    this.result.billingStateId = this.form.billingStateId.value;
    this.result.contactNumber = this.form.contactNumber.value;
    this.result.apcontactName = this.form.apcontactName.value;
    this.result.apcontactMail = this.form.apcontactMail.value;
    this.result.apcontactNumber = this.form.apcontactNumber.value;
    this.result.invoiceEmail = this.form.invoiceEmail.value;
    this.result.bankName = this.form.bankName.value;
    this.result.bankContactNumber = this.form.bankContactNumber.value;
    this.result.bankAddress = this.form.bankAddress.value;
    this.result.bankZip = this.form.bankZip.value;
    this.result.bankStateId = this.form.bankStateId.value;
    this.result.bankCityId = this.form.bankCityId.value;
    this.result.presidentName = this.form.presidentName.value;
    this.result.vicePresidentName = this.form.vicePresidentName.value;
    this.result.secretary = this.form.secretary.value;
    this.result.signature = this.form.signature.value;
    this.result.fax = this.form.fax.value;

    this.tradeRefsControls.forEach((value : any,index) => {
      let trade = new Customertrademodel();
      trade.name = value.controls.tradeCompanyName.value;
      trade.address = value.controls.tradeCompanyAddress.value;
      trade.contactNumber = value.controls.tradeCompanyPhone.value;
      trade.fax = value.controls.tradeCompanyFax.value;
      trade.email = value.controls.tradeCompanyEmail.value;

      this.trades.push(trade);
    });

    this.result.trades = this.trades;
    
    if (this.result.id == "00000000-0000-0000-0000-000000000000") {
      this.navService.post<any>("Customer/Customer/CustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); } else { this.toastr.error(d.message) } });
    } else {
      this.navService.put<any>("Customer/Customer/UpdateCustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); } else { this.toastr.error(d.message) } });
    }
  }
this.isFormSubmitted = true;
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


  UploadCertificate(file: any) {
    if (file.length === 0) {
      return;
    }

    let filesToUpload = file[0];
    const formData = new FormData();
    formData.append('file_Customer', filesToUpload, filesToUpload.name);

    this.navService.post<any>('Customer/Customer/UploadFile', formData, false, undefined, true)
      .subscribe(v => {
        this.result.taxExemptAttachment = v.docPath;

      }, e => this.toastr.error(e.error.message));
  }

  shippingStateChange(value: any) {
    this.shippingCities = this.cities.filter((s: any) => s.stateId == value.id);
  }

  billingStateChange(value: any) {
    this.billingCities = this.cities.filter((s: any) => s.stateId == value.id);
  }

  bankStateChange(value: any) {
    this.bankCities = this.cities.filter((s: any) => s.stateId == value.id);
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

}
