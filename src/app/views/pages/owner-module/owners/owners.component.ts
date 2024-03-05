import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { Observable } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';
import { Ownermodel } from 'src/app/model/ownermodel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RowClassParams } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  status: any = [{ key: 1, value: "Pending" }, { key: 2, value: "Accepted" }, { key: 3, value: "Rejected" }, { key: 4, value: "All" }];
  statusId: number = 4;
  owner: Ownermodel = new Ownermodel();
  @ViewChild('rejectModal') rejectModal: HTMLInputElement;
  rejectForm: UntypedFormGroup;
  isFormSubmitted: boolean;
  getRowStyle: any;
  gridTheme:any = localStorage.getItem('isDark') == 'true'? "ag-theme-quartz-dark":"ag-theme-quartz";
  constructor(private navService: ApiService, private toastr: ToastrService, public formBuilder: UntypedFormBuilder, private router: Router, private modalService: NgbModal,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.GetAll();
    this.rejectForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });

    this.isFormSubmitted = false;


    this.getRowStyle = (params: RowClassParams) => {
      if (params.data.statusId == 3) {
        return { '--ag-data-color': '#FF3366' }
      }
      if (params.data.statusId == 2) {
        return { '--ag-data-color': '#05A34A' }
      }
      return null;
    }
  }
  GetAll() {
    this.rowData$ = this.navService.get<any>("Owner/Owner/GetAll?status=" + this.statusId);
    this.spinnerService.hide();
  }

  GetOwners(event: any) {
    this.statusId = event.key;
    this.GetAll();
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  redirectToAddScreen() {
    this.router.navigate(['/admin/owner']);
  }

  AcceptOwner(model: Ownermodel) {
    debugger;
    model.statusId = 2;
    this.navService.put<any>("Owner/Owner/OwnerStatus", model).subscribe(d => { if (d.success) { this.toastr.success("Record accepted successfully."); this.GetAll(); } else { this.toastr.error(d.message); this.GetAll(); } }, e => this.spinnerService.hide());
  }

  RejectOwner(model: Ownermodel) {
    model.statusId = 3;
    this.navService.put<any>("Owner/Owner/OwnerStatus", model).subscribe(d => { if (d.success) { this.toastr.success("Record rejected successfully."); this.GetAll(); } else { this.toastr.error(d.message); this.GetAll(); } }, e => this.spinnerService.hide());
  }

  openRejectModal(model: Ownermodel) {
    this.modalService.open(this.rejectModal, {}).result.then((result) => {
    }).catch((res) => { });

    this.owner = model;
  }

  get form() {
    return this.rejectForm.controls;
  }

  formSubmit() {
    if (this.rejectForm.valid) {
      this.owner.rejectedReason = this.rejectForm.controls['reason'].value;
      this.RejectOwner(this.owner);
      this.modalService.dismissAll()
    }
    this.isFormSubmitted = true;
  }

  onCellClicked(params: any) {
    params.node.setSelected(true);
    if (params.event.srcElement.id == "accept") {
      this.AcceptOwner(params.data)
    }
    if (params.event.srcElement.id == "reject") {
      this.owner.id = params.data.id;
      this.openRejectModal(params.data)
    }
    if (params.event.srcElement.id == "edit") {

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
          if (result.value) {
            this.navService.put("Owner/Owner/Delete/" + params.data.id).subscribe(d => { if (d) { this.toastr.success("Record deleted successfully."); this.GetAll() } else { this.toastr.error("something went wrong"); this.GetAll() } }, e => this.spinnerService.hide());
          }
        }
      });
    }

  }


  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'firstName', cellStyle: { 'font-weight': '600' }, cellRenderer: function (params: any) { return '<a href="/admin/owner/' + params.data.id + '">' + params.data.firstName + ' ' + (params.data.middleName ?? "") + ' ' + params.data.lastName + '<a/>' } },
    { headerName: 'Driver License', field: 'license', cellStyle: { 'font-weight': '600' } },
    { headerName: 'Address', field: 'address', cellStyle: { 'font-weight': '600' } },
    {
      headerName: 'Status', field: 'formStatusName', cellStyle: { 'font-weight': '600' }, cellRenderer: function (params: any) {
        let data = '';
        if (params.data.statusId == 1) {
          data += '<span>Pending</span>'
        }
        if (params.data.statusId == 2) {
          data += '<span><span style="color: green"><i class="mdi mdi-checkbox-marked-circle"></i></span> Approved</span>'
        }
        if (params.data.statusId == 3) {
          data += '<span><span style="color: red"><i class="mdi mdi-close-circle"></i></span> Rejected</span>'
        }
        return data;
      }
    },
    {
      headerName: 'Action', field: 'id', filter: false, sortable: false, cellRenderer: function (params: any) {
        let data = '';
        if (params.data.statusId == 1) {
          data += '<a><i class="mdi mdi-account-check" id="accept" style="font-size: 20px;color:green;padding-right:10px;" title="Accept"></i></a> |';
          data += '<a><i class="mdi mdi-account-remove" id="reject" title="Reject" style="font-size: 20px;color:red;padding-left:10px;padding-right:10px;"></i></a> |';
        }
        data += '<a><i class="mdi mdi-delete-forever" id="delete" title="Delete" style="color: red; font-size: 20px;padding-left:10px"></a>';
        return data;
      }
    }];

  rowData$: Observable<any[]>;
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }

}
