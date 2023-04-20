import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonsState } from './models/pokemons-state.model';
import { PokemonName } from '@tambo/shared';
import { selectCartAsList } from '@tambo/store/cart';

export const selectPokemons = createFeatureSelector<PokemonsState>('pokemons');

export interface CartSummary {
  count: number;
  amount: number;
}

const reduceCartSummary = (pokemons: PokemonsState, cartList: PokemonName[]) =>
  cartList.reduce(
    (acc, v) => {
      const pokemon = pokemons[v];
      if (pokemon) {
        return {
          amount: acc.amount + (pokemon.price || 0),
          count: acc.count + 1,
        };
      } else {
        return { amount: acc.amount, count: acc.count + 1 };
      }
    },
    { count: 0, amount: 0 }
  );

export const selectCartSummary = createSelector(
  selectPokemons,
  selectCartAsList,
  reduceCartSummary
);
