import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { Drivermodel } from 'src/app/model/drivermodel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { RowClassParams } from 'ag-grid-community';
@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.scss']
})
export class DriverTableComponent implements OnInit {
  status: any = [{ key: 1, value: "Pending" }, { key: 2, value: "Accepted" }, { key: 3, value: "Rejected" }, { key: 4, value: "All" }];
  statusId: number = 4;
  drivers: Drivermodel[] = [];
  driver: Drivermodel = new Drivermodel();
  rejectForm: UntypedFormGroup;
  isFormSubmitted: boolean;
  getRowStyle: any;
  @ViewChild('rejectModal') rejectModal: HTMLInputElement;

  constructor(private navService: ApiService, private toastr: ToastrService, private router: Router, private modalService: NgbModal,
    public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.GetAll();
    this.rejectForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });

    this.isFormSubmitted = false;


    this.getRowStyle = (params: RowClassParams) => {
      if (params.data.formStatusId == 3) {
        return { 'background-color': '#FFE4E4' }
      }
      if (params.data.formStatusId == 2) {
        return { 'background-color': '#E5FFE4' }
      }
      return null;
    }

  }

  GetAll() {
    this.rowData$ = this.navService.get<any>("Driver/Account/GetDrivers?status=" + this.statusId);
  }

  get form() {
    return this.rejectForm.controls;
  }

  formSubmit() {
    if (this.rejectForm.valid) {
      this.driver.rejectedReason = this.rejectForm.controls['reason'].value;
      this.RejectDriver(this.driver);
      this.modalService.dismissAll()
    }
    this.isFormSubmitted = true;
  }

  GetDrivers(event: any) {
    this.statusId = event.key;
    this.GetAll();
  }

  EditDriver(Id: any) {
    this.router.navigateByUrl('/admin/driver/register/' + Id)
  }

  AcceptDriver(model: Drivermodel) {
    model.formStatusId = 2;
    this.navService.put<any>("Driver/Account/DriverStatus", model).subscribe(d => { if (d.success) { this.toastr.success("Record accepted successfully."); this.GetAll(); } }, e => this.toastr.error(e));
  }

  RejectDriver(model: Drivermodel) {
    model.formStatusId = 3;
    this.navService.put<any>("Driver/Account/DriverStatus", model).subscribe(d => { if (d.success) { this.toastr.success("Record rejected successfully."); this.GetAll(); } }, e => this.toastr.error(e));
  }

  openRejectModal(model: Drivermodel) {
    this.modalService.open(this.rejectModal, {}).result.then((result) => {
    }).catch((res) => { });

    this.driver = model;
  }

  redirectToAddDriver() {
    this.router.navigate(['/admin/driver/register']);
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  onCellClicked(params: any) {
    params.node.setSelected(true);
    if (params.event.srcElement.id == "accept") {
      this.driver.id = params.data.id
      this.AcceptDriver(this.driver)
    }
    if (params.event.srcElement.id == "reject") {
      debugger;
      this.driver.id = params.data.id;

      this.openRejectModal(params.data)
    }
    if (params.event.srcElement.id == "delete") {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          this.navService.put("Driver/Account/DeleteDriver/" + params.data.id).subscribe(d => { if (d) { this.toastr.success("Record deleted successfully."); this.GetAll() } else { this.toastr.error("something went wrong") } });
        }
      });
    }

  }


  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'fullName', cellStyle: { 'font-weight': '600' }, cellRenderer: function (params: any) { return '<a href="/admin/driver/register/' + params.data.id + '">' + params.data.fullName + '<a/>' } },
    { headerName: 'Email', field: 'email', cellStyle: { 'font-weight': '600' } },
    { headerName: 'Contact Number', field: 'phoneNumber', cellStyle: { 'font-weight': '600' } },
    {
      headerName: 'Status', field: 'formStatusName', cellStyle: { 'font-weight': '600' }, cellRenderer: function (params: any) {
        let data = '';
        if (params.data.formStatusId == 1) {
          data += '<span>Pending</span>'
        }
        if (params.data.formStatusId == 2) {
          data += '<span><span style="color: green">●</span> Approved</span>'
        }
        if (params.data.formStatusId == 3) {
          data += '<span><span style="color: red">●</span> Rejected</span>'
        }
        return data;
      }
    },
    {
      headerName: 'Action', field: 'id', filter: false, sortable: false, cellRenderer: function (params: any) {
        let data = '';
        if (params.data.formStatusId == 1) {
          data += '<a><i class="mdi mdi-account-check" id="accept" style="font-size: 20px;color:green;" title="Accept"></i></a> |';
          data += '<a><i class="mdi mdi-account-remove" id="reject" title="Reject" style="font-size: 20px;color:red;"></i></a> |';
        }
        data += '<a><i class="mdi mdi-delete-forever" id="delete" title="Delete" style="color: red; font-size: 20px;"></a>';
        return data;
      }
    }];

  rowData$: Observable<any[]>;
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }


}
