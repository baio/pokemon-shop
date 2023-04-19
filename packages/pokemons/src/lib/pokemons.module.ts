import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pokemonsRoutes } from './lib.routes';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { pokemonsReducer } from './store/pokemons.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsEffects } from './store/pokemons.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pokemonsRoutes),
    RouterModule,
    StoreModule.forFeature('pokemons', pokemonsReducer),
    EffectsModule.forFeature([PokemonsEffects]),
  ],
})
export class PokemonsModule {}
