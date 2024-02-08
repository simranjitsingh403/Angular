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
  vehicleBrands = [];
  cities:any = [];
  states = [];
  newCities=[];
  result: Ownermodel = new Ownermodel();
  ownerId: any = this.route.snapshot.params['id'] == undefined? "00000000-0000-0000-0000-000000000000" : this.route.snapshot.params['id'];

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

    this.navService.get<Ownermodel>("Owner/Owner/Register?Id="+this.ownerId).subscribe((response) => {
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
        type: this.result.typeId.toString(),
        cityId: this.result.parkingCityId != 0 ? this.result.parkingCityId : null,
        stateId: this.result.stateId != 0 ? this.result.stateId : null,
        license: this.result.license,
        experience: this.result.experience,
        parkingStateId: this.result.parkingStateId != 0 ? this.result.parkingStateId : null,
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

      if (this.result.id == "00000000-0000-0000-0000-000000000000") {
      this.navService.post<any>("Owner/Owner/Register", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/owners']); } else { this.toastr.error(d.message) } });
    } else {
      this.navService.put<any>("Owner/Owner/UpdateOwner", this.result).subscribe(d => { if (d.success == true) { this.toastr.success(d.message); this.router.navigate(['/admin/owners']); } else { this.toastr.error(d.message) } });
    }

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
    if (file.length === 0) {
      return;
    }

    let filesToUpload = file[0];
    const formData = new FormData();
    formData.append('file_Owner', filesToUpload, filesToUpload.name);

    this.navService.post<any>('Owner/Owner/UploadFile', formData, false, undefined, true)
      .subscribe(v => {
        this.result.dotInspectionPath = v.picPath;

      }, e => this.toastr.error(e.error.message));
  }

  UploadCurrentRegistration(file: any) {
    if (file.length === 0) {
      return;
    }

    let filesToUpload = file[0];
    const formData = new FormData();
    formData.append('file_Owner', filesToUpload, filesToUpload.name);

    this.navService.post<any>('Owner/Owner/UploadFile', formData, false, undefined, true)
      .subscribe(v => {
        this.result.currentRegistrationPath = v.picPath;

      }, e => this.toastr.error(e.error.message));
  }

  stateChange(value:any){
    this.newCities = this.cities.filter((s:any) => s.stateId == value.id);
  }

}
