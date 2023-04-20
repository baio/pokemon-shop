import { createAction, props } from '@ngrx/store';
import { PokemonName } from '@tambo/shared';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ name: PokemonName }>()
);
