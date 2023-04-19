import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pokemonsRoutes } from './lib.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(pokemonsRoutes), RouterModule],
})
export class PokemonsModule {}
