import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { Observable } from 'rxjs';
import Swal, {SweetAlertOptions} from 'sweetalert2';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  constructor(private navService: ApiService, private toastr: ToastrService, public formBuilder: UntypedFormBuilder) {
  }
  closeResult: string = '';
  isFormSubmitted = false;
  validationForm: any;
  buttonValue:any;
  heading:any;
  ngOnInit(): void {
    this.buttonValue="Create";
    this.heading="ADD ROLE";
    this.validationForm = this.formBuilder.group({
      name: ['', Validators.required],
      isDeleted:[0],
      id:['00000000-0000-0000-0000-000000000000'],
      AspNetRoleId:['00000000-0000-0000-0000-000000000000']
    });

    this.GetAll();
  }


  GetAll() {
    this.rowData$ = this.navService.get<any>("Role");
  }

  get form() {
    return this.validationForm.controls;
  }

  formSubmit() {
    debugger;
    if (!this.validationForm.valid) {
      this.isFormSubmitted = true;
    }
    else{
      this.navService.post("Role", this.validationForm.value).subscribe(d =>{ if(d){this.clear();this.GetAll();this.toastr.success("Record save successfully.")}else{this.toastr.error("something went wrong.")} });
    }
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  onCellClicked(params: any) {
    params.node.setSelected(true);
    if(params.event.srcElement.id=="edit"){
      this.validationForm.patchValue({
        name: params.data.name,
        id:params.data.id
      })
      this.heading="EDIT ROLE";
      this.buttonValue='Update';
    }

    if(params.event.srcElement.id=="delete"){
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
          this.validationForm.patchValue({
            name: params.data.name,
            id:params.data.id
          })
          this.navService.put("Role", this.validationForm.value).subscribe(d => { if(d){this.toastr.success("Record deleted successfully.");this.clear(); this.GetAll()}else{this.toastr.error("something went wrong")}});
        }
      });
    }
   
  }
  
 
  clear(){
    this.validationForm.patchValue({
      name: '',
      id:''
    })
    this.buttonValue='Create';
    this.heading="ADD ROLE";
  }

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name',cellStyle: {'font-weight': '600'}},
    {
      headerName: 'Action', field: 'id',filter:false,sortable:false, cellRenderer: function () {
        return '<a><i class="mdi mdi-pencil" id="edit" style="font-size: 20px;"></i></a> | <a><i class="mdi mdi-delete-forever" id="delete" style="color: red; font-size: 20px;"></a>'
      }
    }];

  rowData$: Observable<any[]>;
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }

}

