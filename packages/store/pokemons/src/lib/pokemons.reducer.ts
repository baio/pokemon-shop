import { createReducer, on } from '@ngrx/store';
import { PokemonsState } from './models/pokemons-state.model';
import {
  enrichPokemons,
  loadBasePokemonsSuccess,
  pokemonLoaded,
} from './pokemons.actions';
import { fromPairs } from 'lodash/fp';

export const initialState: PokemonsState = {};

const onLoadBasePokemonsSuccess = (
  state: PokemonsState,
  action: ReturnType<typeof loadBasePokemonsSuccess>
) => {
  const hash = fromPairs(
    action.pokemons.map((m) => [m.name, m])
  ) as PokemonsState;
  return { ...hash, ...state };
};

export const pokemonsReducer = createReducer(
  initialState,
  on(loadBasePokemonsSuccess, onLoadBasePokemonsSuccess),
  on(pokemonLoaded, (state, { pokemon }) => ({
    ...state,
    [pokemon.name]: pokemon,
  }))
);
