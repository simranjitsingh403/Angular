import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Ownermodel } from 'src/app/model/ownermodel';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  validationForm: UntypedFormGroup;
  isFormSubmitted: Boolean;
  apiPath: string = environment.baseURL;
  ownerId: any = this.route.snapshot.params['id'];
  vehicleBrands = [];
  cities = [];
  states = [];
  result: Ownermodel = new Ownermodel();

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      address: ['', Validators.required],
      value: [],
      year: [],
      brandId: [],
      modal: [''],
      vinCode: [''],
      type: [],
      cityId: [],
      stateId: [],
      license: [],
      parkingStateId: [],
      experience: [],
      dotInspection: [],
      currentRegistration: []
    });

    this.navService.get<Ownermodel>("Owner/Owner/Register?Id=00000000-0000-0000-0000-000000000000").subscribe((response) => {
      this.result = response;
    }, e => this.toastr.error(e.message), () => {
      this.validationForm.patchValue({
        firstName: this.result.firstName,
        lastName: this.result.lastName,
        middleName: this.result.middleName,
        address: this.result.address,
        value: this.result.value,
        year: this.result.year,
        brandId: this.result.brandId != 0 ? this.result.brandId : null,
        modal: this.result.modal,
        vinCode: this.result.vinCode,
        type: this.result.typeId,
        cityId: this.result.parkingCityId != 0 ? this.result.parkingCityId : null,
        stateId: this.result.stateId != 0 ? this.result.stateId : null,
        license: this.result.license,
        experience: this.result.experience,
      });
      this.states = this.result.states;
      this.cities = this.result.cities;
      this.vehicleBrands = this.result.carBrands;

    });
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    if (this.validationForm.valid) {
      this.result.firstName = this.form.firstName.value;
      this.result.lastName = this.form.lastName.value;
      this.result.middleName = this.form.middleName.value;
      this.result.address = this.form.address.value;
      this.result.value = this.form.value.value;
      this.result.year = this.form.year.value;
      this.result.brandId = this.form.brandId.value;
      this.result.modal = this.form.modal.value;
      this.result.vinCode = this.form.vinCode.value;
      this.result.typeId = this.form.type.value;
      this.result.parkingCityId = this.form.cityId.value;
      this.result.stateId = this.form.stateId.value;
      this.result.license = this.form.license.value;
      this.result.experience = this.form.experience.value;
      console.log(this.result);

    }
    this.isFormSubmitted = true;
  }

  fieldsChange(values: any): void {
    if (values.currentTarget.checked) {
    }
    else {
    }
  }

  UploadDOTInspection(file: any) {

  }

  UploadCurrentRegistration(file: any) {

  }

}
