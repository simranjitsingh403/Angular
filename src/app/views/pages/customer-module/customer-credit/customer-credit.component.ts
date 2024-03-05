import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usermodel } from 'src/app/model/usermodel';
import { Customercreditmodel } from 'src/app/model/customercreditmodel';
import { Customertrademodel } from 'src/app/model/customertrademodel';
import { CreditComponent } from '../credit/credit.component';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-credit',
  templateUrl: './customer-credit.component.html',
  styleUrls: ['./customer-credit.component.scss']
})
export class CustomerCreditComponent implements OnInit {
  result: Customercreditmodel = new Customercreditmodel();
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  @ViewChild(CreditComponent) creditComponent: CreditComponent;
  customerId = this.route.snapshot.params['id'] == undefined ? this.userdetails.customerId : this.route.snapshot.params['id'];

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private spinnerService: NgxSpinnerService) {
  }


  ngOnInit(): void {
    console.log();
    this.navService.get<Customercreditmodel>("Customer/Customer/CustomerCredit?Id=" + this.customerId).subscribe((response) => {
      this.result = response;

      this.creditComponent.trades = response.trades != null ? response.trades : [];

    }, e => { this.toastr.error(e.message); this.spinnerService.hide(); }, () => {
      this.creditComponent.validationForm.patchValue({

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

      this.creditComponent.validationForm.controls["tradeRefs"].patchValue([
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
      this.spinnerService.hide();
      this.creditComponent.isTaxExempt = this.result.taxExemptAttachment != null ? true : false;
      this.creditComponent.isInvoiceEmail = this.result.invoiceEmail != null ? true : false;
    });
  }

  formSubmit(event: any) {

    if (this.creditComponent.validationForm.valid) {
      this.result.customerId = this.customerId;
      this.result.isPORequired = this.creditComponent.form.isPORequired.value;
      this.result.businessYears = this.creditComponent.form.businessYears.value;
      this.result.taxID = this.creditComponent.form.taxID.value;
      this.result.companyName = this.creditComponent.form.companyName.value;
      this.result.shippingAddress = this.creditComponent.form.shippingAddress.value;
      this.result.shippingZip = this.creditComponent.form.shippingZip.value;
      this.result.shippingStateId = this.creditComponent.form.shippingStateId.value;
      this.result.shippingCityName = this.creditComponent.form.shippingCityName.value;
      this.result.billingAddress = this.creditComponent.form.billingAddress.value;
      this.result.billingZip = this.creditComponent.form.billingZip.value;
      this.result.billingCityName = this.creditComponent.form.billingCityName.value;
      this.result.billingStateId = this.creditComponent.form.billingStateId.value;
      this.result.contactNumber = this.creditComponent.form.contactNumber.value;
      this.result.apContactName = this.creditComponent.form.apcontactName.value;
      this.result.apContactMail = this.creditComponent.form.apcontactMail.value;
      this.result.apContactNumber = this.creditComponent.form.apcontactNumber.value;
      this.result.invoiceEmail = this.creditComponent.form.invoiceEmail.value;
      this.result.bankName = this.creditComponent.form.bankName.value;
      this.result.bankContactNumber = this.creditComponent.form.bankContactNumber.value;
      this.result.bankAddress = this.creditComponent.form.bankAddress.value;
      this.result.bankZip = this.creditComponent.form.bankZip.value;
      this.result.bankStateId = this.creditComponent.form.bankStateId.value;
      this.result.bankCityName = this.creditComponent.form.bankCityName.value;
      this.result.presidentName = this.creditComponent.form.presidentName.value;
      this.result.vicePresidentName = this.creditComponent.form.vicePresidentName.value;
      this.result.secretary = this.creditComponent.form.secretary.value;
      if (!this.creditComponent.signPad.isEmpty()) {
        this.result.signature = this.creditComponent.signPad.toDataURL();
      }
      this.result.fax = this.creditComponent.form.fax.value;
      if (!isNullOrUndefined(this.creditComponent.taxExemptAttachment)) {
        this.result.taxExemptAttachment = this.creditComponent.taxExemptAttachment;
      }

      this.creditComponent.tradeRefsControls.forEach((value: any, index) => {
        let trade;
        if (this.creditComponent.trades.length == 3) {
          trade = this.creditComponent.trades[index];
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
          this.creditComponent.trades.push(trade);
        }
      });

      this.result.trades = this.creditComponent.trades;

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
              this.navService.post<any>("Customer/Customer/CustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/shipperdashboard']); } else { this.toastr.error(d.message) } this.spinnerService.hide(); }, e => this.spinnerService.hide());
            } else {
              this.navService.put<any>("Customer/Customer/UpdateCustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/shipperdashboard']); } else { this.toastr.error(d.message) } this.spinnerService.hide(); }, e => this.spinnerService.hide());
            }
          }
        });

      } else {
        this.result.isSubmitted = false;
        if (this.result.id == "00000000-0000-0000-0000-000000000000") {
          this.navService.post<any>("Customer/Customer/CustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/shipperdashboard/']); } else { this.toastr.error(d.message) } this.spinnerService.hide(); }, e => this.spinnerService.hide());
        } else {
          this.navService.put<any>("Customer/Customer/UpdateCustomerCredit", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); } else { this.toastr.error(d.message) } this.spinnerService.hide(); }, e => this.spinnerService.hide());
        }
      }
    }
    this.creditComponent.isFormSubmitted = true;
  }



}
