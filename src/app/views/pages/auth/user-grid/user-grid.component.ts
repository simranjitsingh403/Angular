import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { Observable } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {

  constructor(private navService: ApiService, private toastr: ToastrService, public formBuilder: UntypedFormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll() {
    this.rowData$ = this.navService.get<any>("Account/Users");
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  redirectToAddScreen() {
    this.router.navigate(['/admin/user']);
  }


  onCellClicked(params: any) {
    params.node.setSelected(true);
    if (params.event.srcElement.id == "edit") {
      this.router.navigateByUrl("/admin/user/" + params.data.id);
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
            this.navService.put("Account/DeleteUser/" + params.data.id).subscribe(d => { if (d) { this.toastr.success("Record deleted successfully."); this.GetAll() } else { this.toastr.error("something went wrong") } });
          }
        }
      });
    }

  }


  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'firstName', cellStyle: { 'font-weight': '600' }, cellRenderer: function (params: any) { return '<a href="/admin/user/' + params.data.id + '">' + params.data.firstName + ' ' + (params.data.middleName ?? "") + ' ' + params.data.lastName + '<a/>' } },
    { headerName: 'Email', field: 'email', cellStyle: { 'font-weight': '600' } },
    { headerName: 'Contact Number', field: 'phoneNumber', cellStyle: { 'font-weight': '600' } },
    { headerName: 'Role', field: 'roleName', cellStyle: { 'font-weight': '600' } },
    {
      headerName: 'Action', field: 'id', filter: false, sortable: false, cellRenderer: function () {
        let data = '';
        //data += '<a><i class="mdi mdi-tooltip-edit" id="edit" style="font-size: 20px;color:green;padding-right:10px;" title="Edit"></i></a>';
        data += '<a><i class="mdi mdi-delete-forever" id="delete" style="color: red; font-size: 20px;"></a>';
        return data;
      }
    }];

  rowData$: Observable<any[]>;
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }
}
