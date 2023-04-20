import { createReducer, on } from '@ngrx/store';
import { CartState } from '../models/cart-state.model';
import { addToCart, removeFromCart } from './cart.actions';
import { omit } from 'lodash/fp';

export const initialState: CartState = {};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { name, date }) => ({ ...state, [name]: date })),
  on(removeFromCart, (state, { name }) => omit(name, state))
);
