import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'pokemons',
    loadChildren: () => import('@tambo/pokemons').then((m) => m.PokemonsModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('@tambo/cart').then((m) => m.CartModule),
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];
