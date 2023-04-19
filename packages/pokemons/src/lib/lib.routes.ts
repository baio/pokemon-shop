import { Route } from '@angular/router';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';

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
