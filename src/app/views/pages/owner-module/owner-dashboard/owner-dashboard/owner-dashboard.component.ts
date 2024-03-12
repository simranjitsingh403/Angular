import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../../api.service';
import { Ownermodel } from '../../../../../model/ownermodel';
import { Usermodel } from '../../../../../model/usermodel';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss']
})
export class OwnerDashboardComponent implements OnInit {
  userdetails: Usermodel = JSON.parse(localStorage.getItem('userDetails') || "{}");
  ownerId = this.userdetails.ownerId;
  result: Ownermodel = new Ownermodel();
  status: any = [{ key: 1, value: "Pending" }, { key: 2, value: "Accepted" }, { key: 3, value: "Rejected" }];
  statusName: string = "";
  isDark = localStorage.getItem('isDark') == 'true'?true:false;

  constructor(private navService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.navService.get<Ownermodel>("Owner/Owner/Register?Id=" + this.ownerId).subscribe((response) => {
      this.result = response; this.GetStatus(response.statusId); this.spinnerService.hide();
    }, e => this.spinnerService.hide());
  }

  EditClick() {
    this.router.navigate(['admin/owner/' + this.result.id]);
  }

  GetStatus(Id: number) {
    this.status.forEach((element: any) => {
      if (element.key == Id) {
        this.statusName = element.value;
      }
    });
  }

}
