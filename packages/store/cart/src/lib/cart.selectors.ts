import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pluck, sortBy, toPairs } from 'lodash/fp';
import { CartState } from './models/cart-state.model';
import {
  Pokemon,
  PokemonsState,
  selectPokemon,
  selectPokemonSafe,
  selectPokemons,
} from '@tambo/store/pokemons';
import { PokemonName } from '@tambo/shared';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartAsList = createSelector(selectCart, (state) =>
  state ? Object.keys(state) : []
);

export const selectCartAsSortedList = createSelector(selectCart, (state) => {
  const list = toPairs(state || {});
  const ordered = sortBy((x) => x[1] * -1, list);
  const result = pluck(0, ordered);
  return result;
});

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

const mapCartPokemons = (
  pokemons: PokemonsState,
  cartList: PokemonName[]
): Pokemon[] => cartList.map((m) => pokemons[m] || ({ name: m } as Pokemon));

export const selectCartPokemons = createSelector(
  selectPokemons,
  selectCartAsSortedList,
  mapCartPokemons
);

export const getPokemonInCart = (pokemon: Pokemon, cart: CartState | null) => ({
  ...pokemon,
  isInCart: !!(cart && cart[pokemon.name]),
});

export const selectPokemonInCart = (name: string) =>
  createSelector(selectPokemonSafe(name), selectCart, getPokemonInCart);
