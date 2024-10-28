import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { share, tap, timer } from 'rxjs';

@Component({
  selector: 'tickets-flight-typeahead',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrl: './flight-typeahead.component.css',
})
export class FlightTypeaheadComponent {
  destroyRef = inject(DestroyRef);
  timer$ = timer(0, 2_000).pipe(
    tap(value => console.log('Producing value', value)),
    takeUntilDestroyed(),
    share()
  );

  constructor() {
    this.timer$.subscribe({
      next: value => console.log('Callback value', value)
    });
  }
}
