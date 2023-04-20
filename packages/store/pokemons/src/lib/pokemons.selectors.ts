import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonsState } from './models/pokemons-state.model';
import { PokemonName } from '@tambo/shared';

export const selectPokemons = createFeatureSelector<PokemonsState>('pokemons');

export const selectPokemon = (name: PokemonName) =>
  createSelector(selectPokemons, (pokemons) => pokemons[name]);
