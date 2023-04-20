import { createReducer } from '@ngrx/store';
import { CartState } from '../models/cart-state.model';

export const initialState: CartState = {};

export const cartReducer = createReducer(initialState);
