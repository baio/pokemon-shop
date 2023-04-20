/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { PokemonName } from '@tambo/shared';
import { selectCartAsList } from '@tambo/store/cart';
import { PokemonsState, selectPokemons } from '@tambo/store/pokemons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Observable, combineLatest, map } from 'rxjs';
export interface CartSummary {
  count: number;
  amount: number;
}

const reduceCartSummary = ([pokemons, cartList]: [
  PokemonsState,
  PokemonName[]
]) =>
  cartList.reduce(
    (acc, v) => {
      const pokemon = pokemons[v];
      if (pokemon) {
        return {
          amount: acc.amount + (pokemon.price || 0),
          count: acc.count + 1,
        };
      } else {
        return { amount: acc.amount, count: acc.count + 1 };
      }
    },
    { count: 0, amount: 0 }
  );

@Component({
  standalone: true,
  imports: [RouterModule, NzMenuModule, NzIconModule, CommonModule],
  selector: 'tambo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly cartSummary$: Observable<CartSummary>;
  constructor(store: Store) {
    this.cartSummary$ = combineLatest([
      store.select(selectPokemons),
      store.select(selectCartAsList),
    ]).pipe(map(reduceCartSummary));
  }
}
