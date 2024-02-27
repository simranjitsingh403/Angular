import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environment';
import { ShipmentComponent } from '../../../shipment/shipment/shipment.component';
import { Customermodel } from 'src/app/model/customermodel';
import { Usermodel } from 'src/app/model/usermodel';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreditComponent } from '../../credit/credit.component';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { Customertrademodel } from 'src/app/model/customertrademodel';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  validationForm: UntypedFormGroup;
  isFormSubmitted: Boolean;
  apiPath: string = environment.baseURL;
  // @ViewChild(ShipmentComponent) shipmentComponent: ShipmentComponent;
  @ViewChild(CreditComponent) creditComponent: CreditComponent;
  result: Customermodel = new Customermodel();
  isLogin = localStorage.getItem('isLoggedin') == null ? false : true;
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");

  logo = "/assets/images/OneLift_black.png";
  customerId: any = this.route.snapshot.params['id'] == undefined ? "00000000-0000-0000-0000-000000000000" : this.route.snapshot.params['id'];

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', Validators.required],
    });

    this.navService.get<Customermodel>("Customer/Customer/Register?Id=" + this.customerId).subscribe((response) => {
      this.result = response;
      this.creditComponent.trades = response.customerCredit.trades != null ? response.customerCredit.trades : [];

    }, e => this.toastr.error(e.message), () => {
      this.validationForm.patchValue({
        firstName: this.result.firstName,
        lastName: this.result.lastName,
        middleName: this.result.middleName,
        email: this.result.email,
      });

      this.creditComponent.validationForm.patchValue({

        isPORequired: this.result.customerCredit.isPORequired,
        isTaxExempt: this.result.customerCredit.taxExemptAttachment != null ? true : false,
        businessYears: this.result.customerCredit.businessYears,
        taxID: this.result.customerCredit.taxID,
        companyName: this.result.customerCredit.companyName,
        shippingAddress: this.result.customerCredit.shippingAddress,
        shippingZip: this.result.customerCredit.shippingZip,
        shippingCityName: this.result.customerCredit.shippingCityName,
        shippingStateId: this.result.customerCredit.shippingStateId,
        billingAddress: this.result.customerCredit.billingAddress,
        billingZip: this.result.customerCredit.billingZip,
        billingCityName: this.result.customerCredit.billingCityName,
        billingStateId: this.result.customerCredit.billingStateId,
        contactNumber: this.result.customerCredit.contactNumber,
        apcontactName: this.result.customerCredit.apContactName,
        apcontactNumber: this.result.customerCredit.apContactNumber,
        apcontactMail: this.result.customerCredit.apContactMail,
        invoicePreference: this.result.customerCredit.invoiceEmail != null ? "2" : "1",
        invoiceEmail: this.result.customerCredit.invoiceEmail,
        bankName: this.result.customerCredit.bankName,
        bankContactNumber: this.result.customerCredit.bankContactNumber,
        bankAddress: this.result.customerCredit.bankAddress,
        bankZip: this.result.customerCredit.bankZip,
        bankStateId: this.result.customerCredit.bankStateId,
        bankCityName: this.result.customerCredit.bankCityName,
        presidentName: this.result.customerCredit.presidentName,
        vicePresidentName: this.result.customerCredit.vicePresidentName,
        secretary: this.result.customerCredit.secretary,
        signature: this.result.customerCredit.signature,
        fax: this.result.customerCredit.fax,
      });

      this.creditComponent.validationForm.controls["tradeRefs"].patchValue([
        {
          tradeCompanyName: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[0].name : "",
          tradeCompanyAddress: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[0].address : "",
          tradeCompanyPhone: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[0].contactNumber : "",
          tradeCompanyFax: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[0].fax : "",
          tradeCompanyEmail: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[0].email : ""
        },

        {
          tradeCompanyName: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[1].name : "",
          tradeCompanyAddress: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[1].address : "",
          tradeCompanyPhone: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[1].contactNumber : "",
          tradeCompanyFax: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[1].fax : "",
          tradeCompanyEmail: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[1].email : ""
        },

        {
          tradeCompanyName: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[2].name : "",
          tradeCompanyAddress: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[2].address : "",
          tradeCompanyPhone: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[2].contactNumber : "",
          tradeCompanyFax: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[2].fax : "",
          tradeCompanyEmail: this.result.customerCredit.trades != null ? this.result.customerCredit.trades[2].email : ""
        }
      ]);

      this.creditComponent.isTaxExempt = this.result.customerCredit.taxExemptAttachment != null ? true : false;
      this.creditComponent.isInvoiceEmail = this.result.customerCredit.invoiceEmail != null ? true : false;
      this.spinnerService.hide();
    });

    this.isFormSubmitted = false;
  }

  get form() {
    return this.validationForm.controls;
  }

  // get shipmentForm() {
  //   return this.shipmentComponent.validationForm.controls;
  // }

  formSubmit(event: any) {
    if (this.validationForm.valid && this.creditComponent.validationForm.valid) {
      this.result.firstName = this.form.firstName.value;
      this.result.lastName = this.form.lastName.value;
      this.result.middleName = this.form.middleName.value;
      this.result.email = this.form.email.value;
      // this.result.shipment.originAddress = this.shipmentForm.originAddress.value;
      // this.result.shipment.originCityName = this.shipmentForm.originCityName.value;
      // this.result.shipment.originStateId = this.shipmentForm.originStateId.value;
      // this.result.shipment.originZip = this.shipmentForm.originZip.value;
      // this.result.shipment.destinationAddress = this.shipmentForm.destinationAddress.value;
      // this.result.shipment.destinationCityName = this.shipmentForm.destinationCityName.value;
      // this.result.shipment.destinationStateId = this.shipmentForm.destinationStateId.value;
      // this.result.shipment.destinationZip = this.shipmentForm.destinationZip.value;
      // this.result.shipment.height = this.shipmentForm.height.value;
      // this.result.shipment.width = this.shipmentForm.width.value;
      // this.result.shipment.length = this.shipmentForm.length.value;
      // this.result.shipment.weight = this.shipmentForm.weight.value;
      // this.result.shipment.isHazmat = this.shipmentForm.isHazmat.value;
      // this.result.shipment.comments = this.shipmentForm.comments.value;
      // this.result.shipment.comodity = this.shipmentForm.comodity.value;
      // this.result.shipment.jwtToken = localStorage.getItem('token');

      this.result.customerCredit.isPORequired = this.creditComponent.form.isPORequired.value;
      this.result.customerCredit.businessYears = this.creditComponent.form.businessYears.value;
      this.result.customerCredit.taxID = this.creditComponent.form.taxID.value;
      this.result.customerCredit.companyName = this.creditComponent.form.companyName.value;
      this.result.customerCredit.shippingAddress = this.creditComponent.form.shippingAddress.value;
      this.result.customerCredit.shippingZip = this.creditComponent.form.shippingZip.value;
      this.result.customerCredit.shippingStateId = this.creditComponent.form.shippingStateId.value;
      this.result.customerCredit.shippingCityName = this.creditComponent.form.shippingCityName.value;
      this.result.customerCredit.billingAddress = this.creditComponent.form.billingAddress.value;
      this.result.customerCredit.billingZip = this.creditComponent.form.billingZip.value;
      this.result.customerCredit.billingCityName = this.creditComponent.form.billingCityName.value;
      this.result.customerCredit.billingStateId = this.creditComponent.form.billingStateId.value;
      this.result.customerCredit.contactNumber = this.creditComponent.form.contactNumber.value;
      this.result.customerCredit.apContactName = this.creditComponent.form.apcontactName.value;
      this.result.customerCredit.apContactMail = this.creditComponent.form.apcontactMail.value;
      this.result.customerCredit.apContactNumber = this.creditComponent.form.apcontactNumber.value;
      this.result.customerCredit.invoiceEmail = this.creditComponent.form.invoiceEmail.value;
      this.result.customerCredit.bankName = this.creditComponent.form.bankName.value;
      this.result.customerCredit.bankContactNumber = this.creditComponent.form.bankContactNumber.value;
      this.result.customerCredit.bankAddress = this.creditComponent.form.bankAddress.value;
      this.result.customerCredit.bankZip = this.creditComponent.form.bankZip.value;
      this.result.customerCredit.bankStateId = this.creditComponent.form.bankStateId.value;
      this.result.customerCredit.bankCityName = this.creditComponent.form.bankCityName.value;
      this.result.customerCredit.presidentName = this.creditComponent.form.presidentName.value;
      this.result.customerCredit.vicePresidentName = this.creditComponent.form.vicePresidentName.value;
      this.result.customerCredit.secretary = this.creditComponent.form.secretary.value;
      if (!this.creditComponent.signPad.isEmpty()) {
        this.result.customerCredit.signature = this.creditComponent.signPad.toDataURL();
      }
      this.result.customerCredit.fax = this.creditComponent.form.fax.value;
      if (!isNullOrUndefined(this.creditComponent.taxExemptAttachment)) {
        this.result.customerCredit.taxExemptAttachment = this.creditComponent.taxExemptAttachment;
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

      this.result.customerCredit.trades = this.creditComponent.trades;

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
            this.result.customerCredit.isSubmitted = true;
            if (this.result.id == "00000000-0000-0000-0000-000000000000") {
              this.navService.post<any>("Customer/Customer/Register", this.result).subscribe(d => {
                if (d.success == true) {
                  this.toastr.success("Record saved successfully");

                  this.router.navigate(["/auth/login/"]);

                } else { this.toastr.error(d.message) };
                this.spinnerService.hide();
              });
            }
            else {
              this.navService.put<any>("Customer/Customer/UpdateCustomer", this.result).subscribe(d => {
                if (d.success == true) {
                  this.toastr.success("Record saved successfully");

                  this.router.navigate(["/auth/login/"]);

                } else { this.toastr.error(d.message) };
                this.spinnerService.hide();
              });
            }
          }
        });

      } else {
        this.result.customerCredit.isSubmitted = false;
        if (this.result.id == "00000000-0000-0000-0000-000000000000") {
          this.navService.post<any>("Customer/Customer/Register", this.result).subscribe(d => {
            if (d.success == true) {
              this.toastr.success("Record saved successfully");
              this.router.navigate(["/auth/login"]);

            } else { this.toastr.error(d.message) };
            this.spinnerService.hide();
          });
        } else {
          this.navService.put<any>("Customer/Customer/UpdateCustomer", this.result).subscribe(d => {
            if (d.success == true) {
              this.toastr.success("Record saved successfully");
              this.router.navigate(["/auth/login"]);

            } else { this.toastr.error(d.message) };
            this.spinnerService.hide();
          });
        }
      }


    }
    this.isFormSubmitted = true;
    //this.shipmentComponent.isFormSubmitted = true;
    this.creditComponent.isFormSubmitted = true;
  }

}
