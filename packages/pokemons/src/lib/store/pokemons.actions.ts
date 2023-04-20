import { createAction, props } from '@ngrx/store';
import { Pokemon, PokemonBase } from '../models/pokemon.model';

// List of slim items loaded
export const itemsLoaded = createAction(
  '[Pokemons] Items Loaded',
  props<{ items: PokemonBase[] }>()
);

// Load list of enriched items
export const loadPokemons = createAction(
  '[Pokemons] Load Pokemons',
  props<{ pokemons: PokemonBase[] }>()
);

export const loadPokemon = createAction(
  '[Pokemons] Load Pokemon',
  props<{ pokemon: PokemonBase }>()
);

export const pokemonLoaded = createAction(
  '[Pokemons] Pokemon Loaded',
  props<{ pokemon: Pokemon }>()
);

export const pokemonLoadFailure = createAction(
  '[Pokemons] Pokemon Load Failure',
  props<{ pokemon: PokemonBase }>()
);
