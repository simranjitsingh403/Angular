import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ContentChange, SelectionChange } from 'ngx-quill';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(public formBuilder: UntypedFormBuilder, private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      address: ['', Validators.required],
      value: [],
      year:[],
      brandId:[''],
      modal:[''],
      vinCode:[''],
      type:[]
    });
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    if (this.validationForm.valid) {
      this.isFormSubmitted = true;
    }
  }

  fieldsChange(values: any): void {
    if (values.currentTarget.checked) {
    }
    else {
    }
  }

}
