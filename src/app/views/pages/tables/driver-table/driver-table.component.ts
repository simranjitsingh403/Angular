import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ContentChange, SelectionChange } from 'ngx-quill';
import { ApiService } from 'src/app/api.service';
import { Drivermodel } from 'src/app/model/drivermodel';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.scss']
})
export class DriverTableComponent implements OnInit {
  status: any = [{ key: 1, value: "Pending" }, { key: 2, value: "Accepted" }, { key: 3, value: "Rejected" }, { key: 4, value: "All" }];
  statusId: number = 4;
  drivers:Drivermodel[] = [];
  constructor(private navService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.navService.get<Drivermodel[]>("Driver/Account/GetDrivers?status=" + this.statusId).subscribe(v => this.drivers = v)
  }

  GetDrivers(event: any) {
    this.statusId = event.key;
    this.navService.get<Drivermodel[]>("Driver/Account/GetDrivers?status=" + this.statusId).subscribe(v => this.drivers = v)
  }
}
