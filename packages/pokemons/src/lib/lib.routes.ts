import { Route } from '@angular/router';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';

export const pokemonsRoutes: Route[] = [
  {
    path: '',
    component: PokemonsListComponent,
  },
];
