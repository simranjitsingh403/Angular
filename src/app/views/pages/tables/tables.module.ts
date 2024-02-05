import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { DataTableComponent } from './data-table/data-table.component';
import { NgxDatatableComponent } from './ngx-datatable/ngx-datatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';

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
      }
    ]
  }
]

@NgModule({
  declarations: [TablesComponent, BasicTableComponent, DataTableComponent, NgxDatatableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    QuillModule.forRoot(),
    ToastrModule.forRoot()
  ]
})
export class TablesModule { }
