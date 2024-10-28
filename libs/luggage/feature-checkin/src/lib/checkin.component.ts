import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckinFacade } from '@flight-demo/luggage/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'luggage-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
})
export class CheckinComponent implements OnInit {
  private checkinFacade = inject(CheckinFacade);

  luggageList$ = this.checkinFacade.luggageList$;

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.checkinFacade.load();
  }
}
