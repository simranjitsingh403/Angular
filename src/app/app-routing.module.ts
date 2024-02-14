import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { DriverRegistorComponent } from './views/pages/driver-module/driver-register/driver-register.component';
import { RoleComponent } from './views/pages/auth/role/role.component';
import { OwnerComponent } from './views/pages/owner-module/owner/owner.component';
import { DriverTableComponent } from './views/pages/driver-module/driver-table/driver-table.component';
import { DriverDashboardComponent } from './views/pages/driver-module/driver-dashboard/driver-dashboard/driver-dashboard.component';
import { OwnerDashboardComponent } from './views/pages/owner-module/owner-dashboard/owner-dashboard/owner-dashboard.component';
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
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
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
    path:'driver/dashboard',
    pathMatch:'prefix',
    component:DriverDashboardComponent
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
    path:'owner/dashboard',
    pathMatch:'prefix',
    component:OwnerDashboardComponent
  },
  {
    path:'owner/:id',
    pathMatch:'prefix',
    component:OwnerComponent
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
