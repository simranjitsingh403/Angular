import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Drivermodel } from 'src/app/model/drivermodel';
import { Usermodel } from 'src/app/model/usermodel';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss']
})
export class DriverDashboardComponent implements OnInit {
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  driverId = this.userdetails.driverId;
  result: Drivermodel = new Drivermodel();
  status: any = [{ key: 1, value: "Pending" }, { key: 2, value: "Accepted" }, { key: 3, value: "Rejected" }];
  statusName: string;

  constructor(private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.navService.get<Drivermodel>("Driver/Account/Register?Id=" + this.driverId).subscribe((response) => {
      this.result = response; this.GetStatus(response.formStatusId); this.spinnerService.hide();
    }, e => this.spinnerService.hide());
  }

  GetStatus(Id: number) {
    this.status.forEach((element: any) => {
      if (element.key == Id) {
        this.statusName = element.value;
      }
    });
  }

  EditClick() {
    this.router.navigate(['/admin/driver/register/' + this.result.id]);
  }

}
