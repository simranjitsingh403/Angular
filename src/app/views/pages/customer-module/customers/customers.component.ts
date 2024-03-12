import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../api.service';
import { Drivermodel } from '../../../../model/drivermodel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { RowClassParams } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customermodel } from '../../../../model/customermodel';
import { Customercreditmodel } from '../../../../model/customercreditmodel';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  getRowStyle: any;
  rejectForm: any;
  isFormSubmitted: boolean = false;
  status: any = [{ key: 1, value: "Pending" }, { key: 2, value: "Accepted" }, { key: 3, value: "Rejected" }, { key: 4, value: "All" }];
  statusId: number = 4;
  customerCredit: Customercreditmodel = new Customercreditmodel();
  gridTheme:any = localStorage.getItem('isDark') == 'true'? "ag-theme-quartz-dark":"ag-theme-quartz";
  @ViewChild('rejectModal') rejectModal!: HTMLInputElement;

  constructor(private navService: ApiService, private toastr: ToastrService, private router: Router, private modalService: NgbModal,
    public formBuilder: UntypedFormBuilder, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.GetAll();
    this.rejectForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });

    this.isFormSubmitted = false;


    this.getRowStyle = (params: RowClassParams) => {
      if (params.data.status == 3) {
        return { '--ag-data-color': '#FF3366' }
      }
      if (params.data.status == 2) {
        return { '--ag-data-color': '#05A34A' }
      }
      return null;
    }
  }

  GetAll() {
    this.rowData$ = this.navService.get<any>("Customer/Customer/GetCustomes?status=" + this.statusId);
    this.spinnerService.hide();
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  get form() {
    return this.rejectForm.controls;
  }

  formSubmit() {
    if (this.rejectForm.valid) {
      this.customerCredit.rejectedReason = this.rejectForm.controls['reason'].value;
      this.RejectCustomer(this.customerCredit);
      this.modalService.dismissAll()
    }
    this.isFormSubmitted = true;
  }

  GetShippers(event: any) {
    this.statusId = event.key;
    this.GetAll();
  }



  onCellClicked(params: any) {
    params.node.setSelected(true);
    if (params.event.srcElement.id == "accept") {
      this.customerCredit.customerId = params.data.id;
      this.AcceptCustomer(this.customerCredit)
    }
    if (params.event.srcElement.id == "reject") {
      //this.driver.id = params.data.id;
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
          this.navService.put("Customer/Customer/DeleteCustomer/" + params.data.id).subscribe(d => { if (d) { this.toastr.success("Record deleted successfully."); this.GetAll() } else { this.toastr.error("something went wrong") } this.spinnerService.hide(); }, e => this.spinnerService.hide());
        }
      });
    }

  }


  AcceptCustomer(model: any) {
    model.statusId = 2;
    model.rejectedReason = null;
    this.navService.put<any>("Customer/Customer/CustomerCreditStatus", model).subscribe(d => { if (d.success) { this.toastr.success("Record accepted successfully."); this.GetAll(); } else { this.toastr.error(d.message); this.GetAll(); } }, e => { this.toastr.error(e.message); this.spinnerService.hide(); });
  }

  RejectCustomer(model: any) {
    model.statusId = 3;
    this.navService.put<any>("Customer/Customer/CustomerCreditStatus", model).subscribe(d => { if (d.success) { this.toastr.success("Record rejected successfully."); this.GetAll(); } else { this.toastr.error(d.message); this.GetAll(); } }, e => { this.toastr.error(e.message); this.spinnerService.hide(); });
  }

  openRejectModal(model: any) {
    this.modalService.open(this.rejectModal, {}).result.then((result) => {
    }).catch((res) => { });

    this.customerCredit.customerId = model.id;
  }


  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'firstName', cellStyle: { 'font-weight': '600' }, cellRenderer: function (params: any) { return '<a href="/admin/shipper/credit/' + params.data.id + '">' + params.data.firstName + ' ' + params.data.lastName + '<a/>' } },
    { headerName: 'Email', field: 'email', cellStyle: { 'font-weight': '600' } },
    { headerName: 'Account Number', field: 'accountNumber', cellStyle: { 'font-weight': '600' } },
    {
      headerName: 'Status', field: 'formStatusName', cellStyle: { 'font-weight': '600' }, cellRenderer: function (params: any) {
        let data = '';
        if (params.data.status == 1) {
          data += '<span>Pending</span>';
        }
        if (params.data.status == 2) {
          data += '<span><span style="color: green"><i class="mdi mdi-checkbox-marked-circle"></i></span> Approved</span>';
        }
        if (params.data.status == 3) {
          data += '<span><span style="color: red"><i class="mdi mdi-close-circle"></i></span> Rejected</span>';
        }
        return data;
      }
    },
    {
      headerName: 'Action', field: 'id', filter: false, sortable: false, cellRenderer: function (params: any) {
        let data = '';
        if (params.data.status == 1) {
          data += '<a><i class="mdi mdi-account-check" id="accept" style="font-size: 20px;color:green;padding-right:10px;" title="Accept"></i></a> |';
          data += '<a><i class="mdi mdi-account-remove" id="reject" title="Reject" style="font-size: 20px;color:red;padding-left:10px;padding-right:10px;"></i></a> |';
        }
        data += '<a><i class="mdi mdi-delete-forever" id="delete" title="Delete" style="color: red; font-size: 20px;padding-left:10px"></a>';
        return data;
      }
    }];


  rowData$: Observable<any[]> = new Observable<any[]>;
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }
}
