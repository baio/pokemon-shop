import { createFeatureSelector } from '@ngrx/store';
import { CartState } from '../models/cart-state.model';

export const selectCart = createFeatureSelector<CartState>('cart');
