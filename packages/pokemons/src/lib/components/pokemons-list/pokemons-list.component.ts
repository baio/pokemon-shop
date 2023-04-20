import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { PokemonsDataAccessService } from '../../services/pokemons.data-access.service';
import { PokemonsList } from '../../models/pokemons-list.model';
import { Store } from '@ngrx/store';
import { itemsLoaded } from '../../store/pokemons.actions';
import { Pokemon } from '../../models/pokemon.model';
import { selectPokemons } from '../../store/pokemons.selectors';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { addToCart, removeFromCart, selectCart } from '@tambo/cart';

export interface PokemonRow extends Pokemon {
  isInCart: boolean;
}

export type List = PokemonsList<PokemonRow>;

@Component({
  selector: 'tambo-pokemons-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzIconModule],
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListComponent {
  private readonly pageIndex$ = new BehaviorSubject(0);
  private readonly pageSize$ = new BehaviorSubject(10);

  // list self contains it states (not in the store) since data loaded dynamically through pagination, page size and potentially filtering etc
  readonly list$: Observable<List>;

  constructor(
    dataAccess: PokemonsDataAccessService,
    private readonly store: Store
  ) {
    const list$ = combineLatest([this.pageIndex$, this.pageSize$]).pipe(
      switchMap(([pageIndex, pageSize]) =>
        dataAccess.getList(pageIndex, pageSize)
      ),
      tap(({ items }) => store.dispatch(itemsLoaded({ items })))
    );

    // merge data from just loaded list and enriched items from state (since they load separately)
    this.list$ = combineLatest([
      list$,
      store.select(selectPokemons),
      store.select(selectCart),
    ]).pipe(
      map(([list, state, cart]) => ({
        count: list.count,
        items: list.items.map((m) => ({
          ...(state[m.name] || m),
          isInCart: !!cart[m.name],
        })),
      }))
    );
  }

  onPageIndexChanged(index: number) {
    this.pageIndex$.next(index);
  }

  onPageSizeChanged(size: number) {
    this.pageSize$.next(size);
  }

  trackByRow(_: number, row: Pokemon) {
    return row.name;
  }

  onAddToCart(pokemon: Pokemon) {
    return this.store.dispatch(
      addToCart({ name: pokemon.name, date: new Date().getTime() })
    );
  }

  onRemoveFromCart(pokemon: Pokemon) {
    return this.store.dispatch(removeFromCart({ name: pokemon.name }));
  }
}
