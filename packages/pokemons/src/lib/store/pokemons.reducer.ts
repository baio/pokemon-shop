import { createReducer, on } from '@ngrx/store';
import { PokemonsState } from '../models/pokemons-state.model';

export const initialState: PokemonsState = {};

export const pokemonsReducer = createReducer(initialState);
