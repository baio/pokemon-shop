import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterModule, Route } from '@angular/router';
import { pokemonsRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(pokemonsRoutes), RouterModule],
})
export class PokemonsModule {}
