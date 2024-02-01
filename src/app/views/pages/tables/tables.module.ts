import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { DataTableComponent } from './data-table/data-table.component';
import { NgxDatatableComponent } from './ngx-datatable/ngx-datatable.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DriverTableComponent } from './driver-table/driver-table.component';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-table',
        pathMatch: 'full'
      },
      {
        path: 'basic-table',
        component: BasicTableComponent
      },
      {
        path: 'data-table',
        component: DataTableComponent
      },
      {
        path: 'ngx-datatable',
        component: NgxDatatableComponent
      },
      {
        path: 'drivers',
        component: DriverTableComponent
      }
    ]
  }
]

@NgModule({
  declarations: [TablesComponent, BasicTableComponent, DataTableComponent, NgxDatatableComponent, DriverTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ]
})
export class TablesModule { }
