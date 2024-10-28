import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'tickets-flight-typeahead',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrl: './flight-typeahead.component.css',
})
export class FlightTypeaheadComponent implements OnDestroy {
  timer$ = timer(0, 2_000);
  subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.timer$.subscribe({
        next: value => console.log(value)
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
