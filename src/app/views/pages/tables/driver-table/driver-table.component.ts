import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { Drivermodel } from 'src/app/model/drivermodel';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.scss']
})
export class DriverTableComponent implements OnInit {
  status: any = [{ key: 1, value: "Pending" }, { key: 2, value: "Accepted" }, { key: 3, value: "Rejected" }, { key: 4, value: "All" }];
  statusId: number = 4;
  drivers:Drivermodel[] = [];
  driver:Drivermodel = new Drivermodel();
  rejectForm: UntypedFormGroup;
  isFormSubmitted:boolean;

  constructor(private navService: ApiService, private toastr: ToastrService,private router:Router,private modalService: NgbModal,
    public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.navService.get<Drivermodel[]>("Driver/Account/GetDrivers?status=" + this.statusId).subscribe(v => this.drivers = v);

    this.rejectForm = this.formBuilder.group({
      reason:['',Validators.required]
    });

    this.isFormSubmitted = false;
  }

  get form() {
    return this.rejectForm.controls;
  }

  formSubmit() {
    debugger;
    if (this.rejectForm.valid) {
      this.driver.rejectedReason = this.rejectForm.controls['reason'].value;
      this.RejectDriver(this.driver);
      this.modalService.dismissAll()
    }
    this.isFormSubmitted = true;
  }

  GetDrivers(event: any) {
    this.statusId = event.key;
    this.navService.get<Drivermodel[]>("Driver/Account/GetDrivers?status=" + this.statusId).subscribe(v => this.drivers = v)
  }

  EditDriver(Id:any){
    this.router.navigateByUrl('/admin/driver/register/' + Id)
  }

  AcceptDriver(model:Drivermodel){
    model.formStatusId = 2;
    this.navService.put<any>("Driver/Account/DriverStatus", model).subscribe(d => this.toastr.success(d.message),e => this.toastr.error(e));
  }

  RejectDriver(model:Drivermodel){
    model.formStatusId = 3;
    this.navService.put<any>("Driver/Account/DriverStatus", model).subscribe(d => this.toastr.success(d.message),e => this.toastr.error(e));
  }

  openRejectModal(content: TemplateRef<any>,model:Drivermodel) {
    this.modalService.open(content, {}).result.then((result) => {
    }).catch((res) => {});

    this.driver = model;
  }
}
