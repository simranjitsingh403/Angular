import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataTable } from 'simple-datatables';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {

  constructor(private navService: ApiService,private toastr: ToastrService) {
   }
  items:any=[];
  datatable:any;
  ngOnInit(): void {
    this.GetAll();
  }
  

  GetAll() {
    this.navService.get<any>("Role").subscribe(result => {
      this.items = result;
      this.binddatatable();
    });
  }
  binddatatable(){
    setTimeout(() => {
      this.datatable = new DataTable("#dataTable");
    }, 200);
    
  }
}

