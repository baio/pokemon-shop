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
import {
  PokemonInCart,
  removeFromCart,
  selectCart,
  selectPokemonInCart,
} from '@tambo/store/cart';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'tambo-pokemon-item',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule],
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent {
  readonly pokemon$: Observable<PokemonInCart | null>;

  constructor(private readonly store: Store, activatedRoute: ActivatedRoute) {
    const pokemonName$ = activatedRoute.paramMap.pipe(
      map((m) => m.get('id')),
      tap((name) => {
        if (name) {
          // enrich pokemon data if necessary
          store.dispatch(enrichPokemons({ names: [name] }));
        }
      })
    );

    this.pokemon$ = pokemonName$.pipe(
      switchMap((name) =>
        name ? store.select(selectPokemonInCart(name)) : of(null)
      )
    );
  }

  onRemoveFromCart(pokemon: Pokemon) {
    return this.store.dispatch(removeFromCart({ name: pokemon.name }));
  }
}
