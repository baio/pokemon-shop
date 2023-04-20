import { createAction, props } from '@ngrx/store';
import { DateTime, PokemonName } from '@tambo/shared';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ name: PokemonName; date: DateTime }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ name: PokemonName }>()
);
