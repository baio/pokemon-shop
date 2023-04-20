import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pokemonsRoutes } from './lib.routes';
import { RouterModule } from '@angular/router';
import { StorePokemonsModule } from '@tambo/store/pokemons';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pokemonsRoutes),
    RouterModule,
    StorePokemonsModule,
  ],
})
export class PokemonsModule {}
