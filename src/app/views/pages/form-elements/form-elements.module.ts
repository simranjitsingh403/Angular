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
import { DriverRegistorComponent } from '../driver-register/driver-register.component';
import { RoleComponent } from '../auth/role/role.component';
import { UserComponent } from '../auth/user/user.component';
import { OwnerComponent } from '../owner/owner.component';
import { UserGridComponent } from '../auth/user-grid/user-grid.component';
import { DriverTableComponent } from '../tables/driver-table/driver-table.component';

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
        path: 'owner',
        component: OwnerComponent
      },
      {
        path: 'user',
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