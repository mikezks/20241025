import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

@Component({
  selector: 'tickets-flight-typeahead',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrl: './flight-typeahead.component.css',
})
export class FlightTypeaheadComponent {
  destroyRef = inject(DestroyRef);

  constructor() {
    setTimeout(() => this.initMyStream(), 1_000);
  }

  initMyStream(): void {
    timer(0, 2_000).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: value => console.log(value)
    });
  }
}
