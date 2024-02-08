import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { Observable } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  
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
    this.router.navigate(['/admin/owner']);
  }


  onCellClicked(params: any) {
    params.node.setSelected(true);
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
    {
      headerName: 'Action', field: 'id', filter: false, sortable: false, cellRenderer: function () {
        return '<a><i class="mdi mdi-delete-forever" id="delete" style="color: red; font-size: 20px;"></a>'
      }
    }];

  rowData$: Observable<any[]>;
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }

}
