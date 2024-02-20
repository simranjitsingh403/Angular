import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatherIconModule } from '../../../core/feather-icon/feather-icon.module';

// ngx-quill
import { QuillModule } from 'ngx-quill';

// angular-archwizard
import { ArchwizardModule } from 'angular-archwizard';


import { FormElementsComponent } from './form-elements.component';
import { BasicElementsComponent } from './basic-elements/basic-elements.component';
import { EditorsComponent } from './editors/editors.component';
import { WizardComponent } from './wizard/wizard.component';
import { DriverRegistorComponent } from '../driver-module/driver-register/driver-register.component';
import { RoleComponent } from '../auth/role/role.component';
import { UserComponent } from '../auth/user/user.component';
import { OwnerComponent } from '../owner-module/owner/owner.component';
import { OwnersComponent } from '../owner-module/owners/owners.component';
import { UserGridComponent } from '../auth/user-grid/user-grid.component';
import { DriverTableComponent } from '../driver-module/driver-table/driver-table.component';
import { DriverDashboardComponent } from '../driver-module/driver-dashboard/driver-dashboard/driver-dashboard.component';
import { OwnerDashboardComponent } from '../owner-module/owner-dashboard/owner-dashboard/owner-dashboard.component';
import { CustomerCreditComponent } from '../customer-module/customer-credit/customer-credit.component';
import { CustomerDashboardComponent } from '../customer-module/customer-dashboard/customer-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: FormElementsComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-elements',
        pathMatch: 'full'
      },
      {
        path: 'basic-elements',
        component: BasicElementsComponent
      },
      {
        path: 'driver/register/:id',
        component: DriverRegistorComponent
      },
      {
        path: 'driver/register',
        component: DriverRegistorComponent
      },
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: 'owner/:id',
        component: OwnerComponent
      },
      {
        path: 'owner',
        component: OwnerComponent
      },
      {
        path: 'owners',
        component: OwnersComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'user/:id',
        component: UserComponent
      },
      {
        path: 'users',
        component: UserGridComponent
      },
      {
        path: 'drivers',
        component: DriverTableComponent
      },
      {
        path: 'editors',
        component: EditorsComponent
      },
      {
        path: 'wizard',
        component: WizardComponent
      },
      {
        path: 'dashboard',
        component: DriverDashboardComponent
      },
      {
        path: 'ownerdashboard',
        component: OwnerDashboardComponent
      },
      {
        path: 'shipper/credit/:id',
        component: CustomerCreditComponent
      },
      {
        path: 'shipperdashboard',
        component: CustomerDashboardComponent
      }
    ]
  }
]

@NgModule({
  declarations: [FormElementsComponent, BasicElementsComponent, EditorsComponent, WizardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    QuillModule.forRoot(), // ngx-quill
    ArchwizardModule, // angular-archwizard
  ]
})
export class FormElementsModule { }