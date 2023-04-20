import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';

import {
  enrichPokemons,
  loadBasePokemonsSuccess,
  loadPokemon,
  pokemonLoadFailure,
  pokemonLoaded,
} from './pokemons.actions';
import { Store } from '@ngrx/store';
import { selectPokemons } from './pokemons.selectors';
import { Pokemon } from './models';
import { PokemonsDataAccessService } from './services/pokemons.data-access.service';

const isPokemonEnriched = (pokemon: Pokemon) => !!pokemon.imageUrl;

@Injectable()
export class PokemonsEffects {
  loadBasePokemonsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBasePokemonsSuccess),
      map(({ pokemons }) =>
        enrichPokemons({ names: pokemons.map((m) => m.name) })
      )
    )
  );

  enrichPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enrichPokemons),
      withLatestFrom(this.store.select(selectPokemons)),
      map(([{ names }, state]) =>
        // filter not enriched items from state
        names.filter((name) => !state[name] || !isPokemonEnriched(state[name]))
      ),
      mergeMap((names) => names.map((name) => loadPokemon({ name })))
    )
  );

  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemon),
      mergeMap(({ name }) =>
        this.dataAccess.getItem(name).pipe(
          map((pokemon) => pokemonLoaded({ pokemon })),
          catchError(() => of(pokemonLoadFailure({ name })))
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
