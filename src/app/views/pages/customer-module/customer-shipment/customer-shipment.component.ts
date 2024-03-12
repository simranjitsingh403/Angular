import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../api.service';
import { environment } from '../../../../../environments/environment';
import { ShipmentComponent } from '../../shipment/shipment/shipment.component';
import { Usermodel } from '../../../../model/usermodel';
import { NgxSpinnerService } from 'ngx-spinner';
import { Shipmentmodel } from '../../../../model/shipmentmodel';

@Component({
  selector: 'app-customer-shipment',
  templateUrl: './customer-shipment.component.html',
  styleUrls: ['./customer-shipment.component.scss']
})
export class CustomerShipmentComponent implements OnInit {
  apiPath: string = environment.baseURL;
  @ViewChild(ShipmentComponent) shipmentComponent!: ShipmentComponent;
  result: Shipmentmodel = new Shipmentmodel();
  isLogin = localStorage.getItem('isLoggedin') == null ? false : true;
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  shipmentId: any = this.route.snapshot.params['id'] == undefined ? "00000000-0000-0000-0000-000000000000" : this.route.snapshot.params['id'];

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.navService.get<Shipmentmodel>("Customer/Customer/Shipment?Id=" + this.shipmentId).subscribe((response) => {
      this.result = response;

    }, e => { this.toastr.error(e.message); this.spinnerService.hide(); }, () => {
      this.shipmentComponent.validationForm.patchValue({
        originAddress: this.result.originAddress,
        originZip: this.result.originZip,
        originStateId: this.result.originStateId,
        originCityName: this.result.originCityName,
        destinationAddress: this.result.destinationAddress,
        destinationZip: this.result.destinationZip,
        destinationStateId: this.result.destinationStateId,
        destinationCityName: this.result.destinationCityName,
        height: this.result.height,
        width: this.result.width,
        length: this.result.length,
        weight: this.result.weight,
        isHazmat: this.result.isHazmat,
        comodity: this.result.comodity,
        comments: this.result.comments
      });
      this.spinnerService.hide();
    });
  }

  formSubmit(event: any) {
    if (this.shipmentComponent.validationForm.valid) {

    }
    this.shipmentComponent.isFormSubmitted = true;
  }

}
