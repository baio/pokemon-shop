import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pokemonsRoutes } from './lib.routes';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { pokemonsReducer } from './store/pokemons.reducer';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pokemonsRoutes),
    RouterModule,
    StoreModule.forFeature('pokemons', pokemonsReducer),
  ],
})
export class PokemonsModule {}
