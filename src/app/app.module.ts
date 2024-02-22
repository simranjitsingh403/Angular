import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DriverRegistorComponent } from './views/pages/driver-module/driver-register/driver-register.component';
import { RoleComponent } from './views/pages/auth/role/role.component';
import { UserComponent } from './views/pages/auth/user/user.component';
import { UserGridComponent } from './views/pages/auth/user-grid/user-grid.component';
import { DriverTableComponent } from './views/pages/driver-module/driver-table/driver-table.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { AgGridAngular } from 'ag-grid-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OwnerComponent } from './views/pages/owner-module/owner/owner.component';
import { OwnersComponent } from './views/pages/owner-module/owners/owners.component';
import { DriverDashboardComponent } from './views/pages/driver-module/driver-dashboard/driver-dashboard/driver-dashboard.component';
import { OwnerDashboardComponent } from './views/pages/owner-module/owner-dashboard/owner-dashboard/owner-dashboard.component';
import { CustomerComponent } from './views/pages/customer-module/customer/customer/customer.component';
import { ShipmentComponent } from './views/pages/shipment/shipment/shipment.component';
import { CustomerCreditComponent } from './views/pages/customer-module/customer-credit/customer-credit.component';
import { CustomerDashboardComponent } from './views/pages/customer-module/customer-dashboard/customer-dashboard.component';
import { CustomerShipmentComponent } from './views/pages/customer-module/customer-shipment/customer-shipment.component';
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    DriverRegistorComponent,
    RoleComponent,
    DriverTableComponent,
    UserComponent,
    UserGridComponent,
    OwnerComponent,
    OwnersComponent,
    DriverDashboardComponent,
    OwnerDashboardComponent,
    CustomerComponent,
    CustomerCreditComponent,
    CustomerDashboardComponent,
    CustomerShipmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgSelectModule,
    AgGridAngular,
    SweetAlert2Module.forRoot(),
    NgxMaskModule.forRoot(),
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    ShipmentComponent
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
