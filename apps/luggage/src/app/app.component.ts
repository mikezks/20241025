import { CheckinComponent } from '@flight-demo/luggage/feature-checkin';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CheckinComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'luggage';
}
