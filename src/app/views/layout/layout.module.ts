import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { ContentAnimateDirective } from '../../core/content-animate/content-animate.directive';

import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { FeatherIconModule } from '../../core/feather-icon/feather-icon.module';
import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [BaseComponent, NavbarComponent, SidebarComponent, FooterComponent, ContentAnimateDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgScrollbarModule,
    FeatherIconModule
  ]
})
export class LayoutModule { }
