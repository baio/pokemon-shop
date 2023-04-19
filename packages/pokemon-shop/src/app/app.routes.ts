import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'pokemons',
    loadChildren: () => import('@tambo/pokemons').then((m) => m.PokemonsModule),
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];
