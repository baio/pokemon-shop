import { createFeatureSelector } from '@ngrx/store';
import { PokemonsState } from './models/pokemons-state.model';

export const selectPokemons = createFeatureSelector<PokemonsState>('pokemons');
