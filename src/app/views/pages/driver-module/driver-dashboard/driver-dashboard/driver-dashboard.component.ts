import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  userdetails:Usermodel = JSON.parse(localStorage.getItem('userDetails') || "");
  driverId = this.userdetails.driverId;
  result:Drivermodel = new Drivermodel();

  constructor(private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.navService.get<Drivermodel>("Driver/Account/Register?Id=" + this.driverId).subscribe((response) => {
      this.result = response;}, e => this.toastr.error(e.message));
  }

}
