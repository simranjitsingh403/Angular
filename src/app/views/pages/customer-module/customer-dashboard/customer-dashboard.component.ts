import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../api.service';
import { Usermodel } from '../../../../model/usermodel';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(private navService: ApiService, private router: Router, private spinnerService: NgxSpinnerService) { }
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  customerId = this.userdetails.customerId;
  ngOnInit(): void {
    this.navService.get<any>("Customer/Customer/CustomerCredit?Id=" + this.customerId).subscribe(x => {
      if (x.id == '00000000-0000-0000-0000-000000000000') {
        this.router.navigate(["/admin/shipper/credit/" + this.userdetails.customerId]);
      }
      this.spinnerService.hide();
    }, e => this.spinnerService.hide())
  }

}
