import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pluck, sortBy, toPairs } from 'lodash/fp';
import { CartState } from './models/cart-state.model';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartAsList = createSelector(selectCart, (state) =>
  state ? Object.keys(state) : []
);

export const selectCartAsSortedList = createSelector(selectCart, (state) => {
  const list = toPairs(state || {});
  const ordered = sortBy((x) => x[1], list);
  const result = pluck(0, ordered);
  return result;
});
