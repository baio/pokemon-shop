import { createAction, props } from '@ngrx/store';
import { PokemonName } from '@tambo/shared';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ name: PokemonName }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ name: PokemonName }>()
);
