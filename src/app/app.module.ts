import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { DriverRegistorComponent } from './views/pages/driver-registor/driver-registor.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { QuillModule } from 'ngx-quill'
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    DriverRegistorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    QuillModule.forRoot()
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
