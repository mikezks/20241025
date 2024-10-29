import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Flight, FlightService } from '@flight-demo/tickets/domain';
import { debounceTime, distinctUntilChanged, filter, Observable, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-flight-typeahead',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrl: './flight-typeahead.component.css',
})
export class FlightTypeaheadComponent {
  flightService = inject(FlightService);

  control = new FormControl('London', { nonNullable: true });
  flights$ = this.initFlightStream();
  loading = false;

  private initFlightStream(): Observable<Flight[]> {
    /**
     * Stream 1: Form input value change
     *  - Trigger
     *  - State/Data Provider
     */
    return this.control.valueChanges.pipe(
      startWith('London'),
      // Filtering START
      filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // Filtering END
      // Side-Effect: Loading Statev
      tap(() => this.loading = true),
      /**
       * Stream 2: API Backend call based on the city filter
       *  - State/Data Provider
       */
      switchMap(city => this.flightService.find(city, '')),
      // Side-Effect: Loading State
      tap(() => this.loading = false),
    );
  }
}
