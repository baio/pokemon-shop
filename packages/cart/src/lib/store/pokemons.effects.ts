import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { PokemonsDataAccessService } from '../services/pokemons.data-access.service';
import {
  itemsLoaded,
  loadPokemon,
  pokemonLoadFailure,
  pokemonLoaded,
} from './pokemons.actions';
import { Store } from '@ngrx/store';
import { selectPokemons } from './pokemons.selectors';
import { Pokemon } from '../models/pokemon.model';

const isPokemonEnriched = (pokemon: Pokemon) => !!pokemon.imageUrl;

@Injectable()
export class PokemonsEffects {
  // Find items, which still not enriched
  itemsLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemsLoaded),
      withLatestFrom(this.store.select(selectPokemons)),
      map(([{ items }, state]) =>
        // filter not enriched items from state
        items.filter(
          (item) => !state[item.name] || !isPokemonEnriched(state[item.name])
        )
      ),
      mergeMap((pokemons) =>
        pokemons.map((pokemon) => loadPokemon({ pokemon }))
      )
    )
  );

  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemon),
      mergeMap(({ pokemon }) =>
        this.dataAccess.getItem(pokemon.name).pipe(
          map((pokemon) => pokemonLoaded({ pokemon })),
          catchError(() => of(pokemonLoadFailure({ pokemon })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataAccess: PokemonsDataAccessService,
    private readonly store: Store
  ) {}
}
