import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterModule, Route } from '@angular/router';
import { cartRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(cartRoutes), RouterModule],
})
export class CartModule {}
