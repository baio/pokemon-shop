import { createAction, props } from '@ngrx/store';
import { PokemonBase } from '../models/pokemon.model';

export const itemsLoaded = createAction(
  '[Pokemons] Items Loaded',
  props<{ items: PokemonBase[] }>()
);
