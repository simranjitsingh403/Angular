import { Component } from '@angular/core';
import { FeatherIconModule } from '../../../../core/feather-icon/feather-icon.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-success',
  standalone: true,
  imports: [FeatherIconModule,RouterLink],
  templateUrl: './customer-success.component.html',
  styleUrl: './customer-success.component.scss'
})
export class CustomerSuccessComponent {

}
