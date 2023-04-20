import { createReducer, on } from '@ngrx/store';
import { PokemonsState } from '../models/pokemons-state.model';
import { itemsLoaded, pokemonLoaded } from './pokemons.actions';
import { fromPairs } from 'lodash/fp';

export const initialState: PokemonsState = {};

const onItemLoaded = (
  state: PokemonsState,
  action: ReturnType<typeof itemsLoaded>
) => {
  const hash = fromPairs(action.items.map((m) => [m.name, m])) as PokemonsState;
  return { ...hash, ...state };
};

export const pokemonsReducer = createReducer(
  initialState,
  on(itemsLoaded, onItemLoaded),
  on(pokemonLoaded, (state, { pokemon }) => ({
    ...state,
    [pokemon.name]: pokemon,
  }))
);
