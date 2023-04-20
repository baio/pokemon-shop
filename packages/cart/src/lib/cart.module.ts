import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cartRoutes } from './lib.routes';
import { StoreCartModule } from '@tambo/store/cart';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(cartRoutes),
    RouterModule,
    StoreCartModule,
  ],
})
export class CartModule {}
