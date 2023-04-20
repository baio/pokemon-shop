import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { pokemonsReducer } from './pokemons.reducer';
import { PokemonsEffects } from './pokemons.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('pokemons', pokemonsReducer),
    EffectsModule.forFeature([PokemonsEffects]),
  ],
})
export class StorePokemonsModule {}
