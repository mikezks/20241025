import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight, FlightFilter, injectTicketsFacade } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();

  protected filter = signal({
    from: 'London',
    to: 'New York',
    urgent: false
  });
  protected route = computed(
    () => 'From ' + this.filter().from + ' to ' + this.filter().to + '.'
  );
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights$ = this.ticketsFacade.flights$;

  constructor() {
    effect(() => console.log(this.route()));

    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Paris' }));
    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Madrid' }));
    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Rome' }));
    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Athens' }));
    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Bucuresti' }));
    console.log(this.filter().from);


    const counter = signal(0);
    const isEven = computed(() => counter() % 2 === 0);
    // RxJS
    // counter: 0 -> 1
    // counter: 1
    // is Even: true
    // is Even: false

    // Signals
    // counter: 0 -> 1
    // counter: 1
    // is Even: false
    // -> Glitch-free behavior
  }

  protected search(filter: FlightFilter): void {
    this.filter.set(filter);

    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search(this.filter());
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
