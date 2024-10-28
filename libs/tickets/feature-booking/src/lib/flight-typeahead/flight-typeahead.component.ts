import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'tickets-flight-typeahead',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrl: './flight-typeahead.component.css',
})
export class FlightTypeaheadComponent {
  destroyRef = inject(DestroyRef);
  timer$ = timer(0, 2_000);
  subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.timer$.subscribe({
        next: value => console.log(value)
      })
    );

    this.destroyRef.onDestroy(
      () => this.subscription.unsubscribe()
    );
  }
}
