import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environment';
import { ShipmentComponent } from '../../../shipment/shipment/shipment.component';
import { Customermodel } from 'src/app/model/customermodel';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  validationForm: UntypedFormGroup;
  isFormSubmitted: Boolean;
  apiPath: string = environment.baseURL;
  @ViewChild(ShipmentComponent) shipmentComponent: ShipmentComponent;
  result:Customermodel = new Customermodel();
  isLogin=localStorage.getItem('isLoggedin') == null ? false : true;
  logo = "/assets/images/OneLift_black.png";
  customerId: any = this.route.snapshot.params['id'] == undefined? "00000000-0000-0000-0000-000000000000" : this.route.snapshot.params['id'];

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email:[,Validators.required]
    });

    this.navService.get<Customermodel>("Customer/Customer/Register?Id=" + this.customerId).subscribe((response) => {
      this.result = response;

    }, e => this.toastr.error(e.message), () => {
      this.validationForm.patchValue({
        firstName: this.result.firstName,
        lastName: this.result.lastName,
        middleName: this.result.middleName,
        email: this.result.email,
      });

    });

    this.isFormSubmitted = false;
  }

  get form() {
    return this.validationForm.controls;
  }

  get shipmentForm(){
    return this.shipmentComponent.validationForm.controls;
  }
  
  formSubmit(event:any) {
    if (this.validationForm.valid && this.shipmentComponent.validationForm.valid) {
      this.result.firstName = this.form.firstName.value;
      this.result.lastName = this.form.lastName.value;
      this.result.middleName = this.form.middleName.value;
      this.result.email = this.form.email.value;
      this.result.shipment.originAddress = this.shipmentForm.originAddress.value;
      this.result.shipment.originCityId = this.shipmentForm.originCityId.value;
      this.result.shipment.originStateId = this.shipmentForm.originStateId.value;
      this.result.shipment.originZip = this.shipmentForm.originZip.value;
      this.result.shipment.destinationAddress = this.shipmentForm.destinationAddress.value;
      this.result.shipment.destinationCityId = this.shipmentForm.destinationCityId.value;
      this.result.shipment.destinationStateId = this.shipmentForm.destinationStateId.value;
      this.result.shipment.destinationZip = this.shipmentForm.destinationZip.value;
      this.result.shipment.height = this.shipmentForm.height.value;
      this.result.shipment.width = this.shipmentForm.width.value;
      this.result.shipment.length = this.shipmentForm.length.value;
      this.result.shipment.weight = this.shipmentForm.weight.value;
      this.result.shipment.isHazmat = this.shipmentForm.isHazmat.value;
      this.result.shipment.comments = this.shipmentForm.comments.value;
      this.result.shipment.comodityId = this.shipmentForm.comodityId.value;
      this.result.shipment.jwtToken = localStorage.getItem('token');
      
      if (this.result.id == "00000000-0000-0000-0000-000000000000") {
        this.navService.post<any>("Customer/Customer/Register", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/auth/login']); } else { this.toastr.error(d.message) } });
      }
      
    }
    this.isFormSubmitted = true;
  }

}
