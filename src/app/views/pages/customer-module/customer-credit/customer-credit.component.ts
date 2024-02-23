import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
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
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  customerId: any;
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

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router,private spinnerService: NgxSpinnerService) {
    this.customerId = this.route.snapshot.params['id'] == undefined ? this.userdetails.customerId : this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      isPORequired: [false, Validators.required],
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

    this.navService.get<Customercreditmodel>("Customer/Customer/CustomerCredit?Id=" + this.customerId).subscribe((response) => {
      this.result = response;
      console.log(response);
      this.trades = response.trades != null ? response.trades : [];

    }, e => {this.toastr.error(e.message);}, () => {
      this.validationForm.patchValue({

        isPORequired: this.result.isPORequired,
        isTaxExempt: this.result.taxExemptAttachment != null ? true : false,
        businessYears: this.result.businessYears,
        taxID: this.result.taxID,
        companyName: this.result.companyName,
        shippingAddress: this.result.shippingAddress,
        shippingZip: this.result.shippingZip,
        shippingCityName: this.result.shippingCityName,
        shippingStateId: this.result.shippingStateId,
        billingAddress: this.result.billingAddress,
        billingZip: this.result.billingZip,
        billingCityName: this.result.billingCityName,
        billingStateId: this.result.billingStateId,
        contactNumber: this.result.contactNumber,
        apcontactName: this.result.apContactName,
        apcontactNumber: this.result.apContactNumber,
        apcontactMail: this.result.apContactMail,
        invoicePreference: this.result.invoiceEmail != null ? "2" : "1",
        invoiceEmail: this.result.invoiceEmail,
        bankName: this.result.bankName,
        bankContactNumber: this.result.bankContactNumber,
        bankAddress: this.result.bankAddress,
        bankZip: this.result.bankZip,
        bankStateId: this.result.bankStateId,
        bankCityName: this.result.bankCityName,
        presidentName: this.result.presidentName,
        vicePresidentName: this.result.vicePresidentName,
        secretary: this.result.secretary,
        signature: this.result.signature,
        fax: this.result.fax,
      });

      this.validationForm.controls["tradeRefs"].patchValue([
        {
          tradeCompanyName: this.result.trades != null ? this.result.trades[0].name : "",
          tradeCompanyAddress: this.result.trades != null ? this.result.trades[0].address : "",
          tradeCompanyPhone: this.result.trades != null ? this.result.trades[0].contactNumber : "",
          tradeCompanyFax: this.result.trades != null ? this.result.trades[0].fax : "",
          tradeCompanyEmail: this.result.trades != null ? this.result.trades[0].email : ""
        },

        {
          tradeCompanyName: this.result.trades != null ? this.result.trades[1].name : "",
          tradeCompanyAddress: this.result.trades != null ? this.result.trades[1].address : "",
          tradeCompanyPhone: this.result.trades != null ? this.result.trades[1].contactNumber : "",
          tradeCompanyFax: this.result.trades != null ? this.result.trades[1].fax : "",
          tradeCompanyEmail: this.result.trades != null ? this.result.trades[1].email : ""
        },

        {
          tradeCompanyName: this.result.trades != null ? this.result.trades[2].name : "",
          tradeCompanyAddress: this.result.trades != null ? this.result.trades[2].address : "",
          tradeCompanyPhone: this.result.trades != null ? this.result.trades[2].contactNumber : "",
          tradeCompanyFax: this.result.trades != null ? this.result.trades[2].fax : "",
          tradeCompanyEmail: this.result.trades != null ? this.result.trades[2].email : ""
        }
      ]);

      this.cities = this.result.cities;
      this.states = this.result.states;
      this.isInvoiceEmail = this.result.invoiceEmail != null ? true : false;
      this.isTaxExempt = this.result.taxExemptAttachment != null ? true : false;
      this.spinnerService.hide();
    });
    this.isFormSubmitted = false;
  }

  formSubmit(event: any) {
    if (this.validationForm.valid) {
      this.result.customerId = this.userdetails.customerId;
      this.result.isPORequired = this.form.isPORequired.value;
      this.result.businessYears = this.form.businessYears.value;
      this.result.taxID = this.form.taxID.value;
      this.result.companyName = this.form.companyName.value;
      this.result.shippingAddress = this.form.shippingAddress.value;
      this.result.shippingZip = this.form.shippingZip.value;
      this.result.shippingStateId = this.form.shippingStateId.value;
      this.result.shippingCityName = this.form.shippingCityName.value;
      this.result.billingAddress = this.form.billingAddress.value;
      this.result.billingZip = this.form.billingZip.value;
      this.result.billingCityName = this.form.billingCityName.value;
      this.result.billingStateId = this.form.billingStateId.value;
      this.result.contactNumber = this.form.contactNumber.value;
      this.result.apContactName = this.form.apcontactName.value;
      this.result.apContactMail = this.form.apcontactMail.value;
      this.result.apContactNumber = this.form.apcontactNumber.value;
      this.result.invoiceEmail = this.form.invoiceEmail.value;
      this.result.bankName = this.form.bankName.value;
      this.result.bankContactNumber = this.form.bankContactNumber.value;
      this.result.bankAddress = this.form.bankAddress.value;
      this.result.bankZip = this.form.bankZip.value;
      this.result.bankStateId = this.form.bankStateId.value;
      this.result.bankCityName = this.form.bankCityName.value;
      this.result.presidentName = this.form.presidentName.value;
      this.result.vicePresidentName = this.form.vicePresidentName.value;
      this.result.secretary = this.form.secretary.value;
      this.result.signature = this.form.signature.value;
      this.result.fax = this.form.fax.value;

      this.tradeRefsControls.forEach((value: any, index) => {
        let trade;
        if (this.trades.length == 3) {
          trade = this.trades[index];
          trade.name = value.controls.tradeCompanyName.value;
          trade.address = value.controls.tradeCompanyAddress.value;
          trade.contactNumber = value.controls.tradeCompanyPhone.value;
          trade.fax = value.controls.tradeCompanyFax.value;
          trade.email = value.controls.tradeCompanyEmail.value;
        } else {
          trade = new Customertrademodel();
          trade.name = value.controls.tradeCompanyName.value;
          trade.address = value.controls.tradeCompanyAddress.value;
          trade.contactNumber = value.controls.tradeCompanyPhone.value;
          trade.fax = value.controls.tradeCompanyFax.value;
          trade.email = value.controls.tradeCompanyEmail.value;
          this.trades.push(trade);
        }
      });

      this.result.trades = this.trades;

      if(event.currentTarget.value == "submit"){
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
              this.navService.post<any>("Customer/Customer/CustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/shipperdashboard']); } else { this.toastr.error(d.message) } this.spinnerService.hide(); });
            } else {
              this.navService.put<any>("Customer/Customer/UpdateCustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); } else { this.toastr.error(d.message) } this.spinnerService.hide(); });
            }
          }
        });
        
      }else{
        this.result.isSubmitted = false;
        if (this.result.id == "00000000-0000-0000-0000-000000000000") {
          this.navService.post<any>("Customer/Customer/CustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/shipperdashboard']); } else { this.toastr.error(d.message) } this.spinnerService.hide(); });
        } else {
          this.navService.put<any>("Customer/Customer/UpdateCustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); } else { this.toastr.error(d.message) } this.spinnerService.hide(); });
        }
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
        this.result.taxExemptAttachment = v.docPath;

      }, e => this.toastr.error(e.error.message),()=>this.spinnerService.hide());
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
