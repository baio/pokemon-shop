import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import {
  Pokemon,
  enrichPokemons,
  selectPokemon,
  selectPokemons,
} from '@tambo/store/pokemons';
import { ActivatedRoute, Router } from '@angular/router';
import { selectCart } from '@tambo/store/cart';
import { NzCardModule } from 'ng-zorro-antd/card';

export interface PokemonInCart extends Pokemon {
  isInCart: boolean;
}

@Component({
  selector: 'tambo-pokemon-item',
  standalone: true,
  imports: [CommonModule, NzCardModule],
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent {
  readonly pokemon$: Observable<PokemonInCart | null>;

  constructor(store: Store, activatedRoute: ActivatedRoute) {
    const pokemonName$ = activatedRoute.paramMap.pipe(
      map((m) => m.get('id')),
      tap((name) => {
        if (name) {
          // enrich pokemon data if necessary
          store.dispatch(enrichPokemons({ names: [name] }));
        }
      })
    );

    const pokemon$ = pokemonName$.pipe(
      switchMap((name) =>
        name
          ? store
              .select(selectPokemon(name))
              .pipe(map((pokemon) => pokemon || ({ name } as Pokemon)))
          : of(null)
      )
    );
    // merge data from just loaded list and enriched items from state (since they load separately)
    this.pokemon$ = combineLatest([pokemon$, store.select(selectCart)]).pipe(
      map(
        ([pokemon, cart]) =>
          pokemon && { ...pokemon, isInCart: !!(cart && cart[pokemon.name]) }
      )
    );
  }
}
