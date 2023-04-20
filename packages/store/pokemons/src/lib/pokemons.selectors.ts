import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonsState } from './models/pokemons-state.model';
import { PokemonName } from '@tambo/shared';
import { Pokemon } from './models';

export const selectPokemons = createFeatureSelector<PokemonsState>('pokemons');

export const selectPokemon = (name: PokemonName) =>
  createSelector(selectPokemons, (pokemons) => pokemons[name]);

export const selectPokemonSafe = (name: PokemonName) =>
  createSelector(
    selectPokemons,
    (pokemons) => pokemons[name] || ({ name } as Pokemon)
  );
