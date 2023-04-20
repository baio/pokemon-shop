import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cartRoutes } from './lib.routes';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
import { CartEffects } from './store/cart.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(cartRoutes),
    RouterModule,
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
})
export class CartModule {}
