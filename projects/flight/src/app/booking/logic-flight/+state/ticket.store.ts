import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Flight } from "../model/flight";
import { computed, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { FlightService } from "../data-access/flight.service";
import { FlightFilter } from "../model/flight-filter";

export const TicketStore = signalStore(
  { providedIn: 'root' },
  withState({
    filter: {
      from: 'London',
      to: 'Paris',
      urgent: false
    },
    flights: [] as Flight[]
  }),
  withComputed(({ flights }) => ({
    delayedFlights: computed(() => flights().filter(flight => flight.delayed))
  })),
  withMethods(store => ({
    updateFilter: (filter: FlightFilter) => patchState(store, { filter }),
    addFlights: (flights: Flight[]) => patchState(store, { flights }),
    resetFlights: () => patchState(store, { flights: [] })
  })),
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights: async () => {
      const flights = await firstValueFrom(flightService.find(
        store.filter.from(),
        store.filter.to(),
        store.filter.urgent()
      ));
      store.addFlights(flights)
    },
  }))
);
