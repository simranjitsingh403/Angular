import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { DriverRegistorComponent } from './views/pages/driver-module/driver-register/driver-register.component';
import { RoleComponent } from './views/pages/auth/role/role.component';
import { OwnerComponent } from './views/pages/owner-module/owner/owner.component';
import { DriverTableComponent } from './views/pages/driver-module/driver-table/driver-table.component';
import { ForgotPasswordComponent } from './views/pages/auth/forgot-password/forgot-password/forgot-password.component';
import { CustomerComponent } from './views/pages/customer-module/customer/customer/customer.component';
import { CustomerShipmentComponent } from './views/pages/customer-module/customer-shipment/customer-shipment.component';
import { LandingCustomerComponent } from './views/pages/customer-module/landing-customer/landing-customer.component';

const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path:'driver/register',
    pathMatch:'prefix',
    component:DriverRegistorComponent
  },
  {
    path: 'driver/register/:id',
    component: DriverRegistorComponent
  },
  {
    path:'role',
    pathMatch:'prefix',
    component:RoleComponent
  },
  
  {
    path:'drivers',
    pathMatch:'prefix',
    component:DriverTableComponent
  },
  {
    path:'owner',
    pathMatch:'prefix',
    component:OwnerComponent
  },
  {
    path:'owner/:id',
    pathMatch:'prefix',
    component:OwnerComponent
  },{
    path:'Account/ResetPassword',
    pathMatch:'prefix',
    component:ForgotPasswordComponent
  },
  {
    path:'shipper',
    pathMatch:'prefix',
    component:CustomerComponent
  },
  {
    path:'landing/shipper',
    pathMatch:'prefix',
    component:LandingCustomerComponent
  },
  {
    path:'landing/shipper/:id',
    pathMatch:'prefix',
    component:LandingCustomerComponent
  },
  {
    path:'shipment',
    pathMatch:'prefix',
    component:CustomerShipmentComponent
  },
  {
    path:'shipment/:id',
    pathMatch:'prefix',
    component:CustomerShipmentComponent
  },
  { 
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
