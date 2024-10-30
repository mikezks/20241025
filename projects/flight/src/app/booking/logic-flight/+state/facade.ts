import { inject } from "@angular/core";
import { Flight } from "../model/flight";
import { FlightFilter } from "../model/flight-filter";
import { TicketStore } from "./ticket.store";


export function injectTicketsFacade() {
  const store = inject(TicketStore);

  return {
    flights: store.flights,
    search: (filter: FlightFilter) => {
      store.updateFilter(filter);
      store.loadFlights();
    },
    update: (flight: Flight) => {},
    reset: () => store.resetFlights()
  };
}
