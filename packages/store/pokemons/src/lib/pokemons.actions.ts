import { createAction, props } from '@ngrx/store';
import { Pokemon, PokemonBase } from './models/pokemon.model';
import { PokemonName } from '@tambo/shared';

export const loadBasePokemonsSuccess = createAction(
  '[Pokemons] Load Base Pokemons Success',
  props<{ pokemons: PokemonBase[] }>()
);

export const enrichPokemons = createAction(
  '[Pokemons] Enrich Pokemons',
  props<{ names: PokemonName[] }>()
);

export const loadPokemon = createAction(
  '[Pokemons] Load Pokemon',
  props<{ name: PokemonName }>()
);

export const pokemonLoaded = createAction(
  '[Pokemons] Pokemon Loaded',
  props<{ pokemon: Pokemon }>()
);

export const pokemonLoadFailure = createAction(
  '[Pokemons] Pokemon Load Failure',
  props<{ name: PokemonName }>()
);
