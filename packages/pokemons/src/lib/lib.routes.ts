import { Route } from '@angular/router';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';

export const pokemonsRoutes: Route[] = [
  {
    path: '',
    component: PokemonsListComponent,
  },
  {
    path: ':id',
    component: PokemonItemComponent,
  },
];
