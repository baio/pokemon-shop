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

@Component({
  selector: 'tambo-pokemons-list',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListComponent {
  private readonly pageIndex$ = new BehaviorSubject(0);
  private readonly pageSize$ = new BehaviorSubject(10);

  // list self contains it states (not in the store) since data loaded dynamically through pagination, page size and potentially filtering etc
  readonly list$: Observable<PokemonsList>;

  constructor(dataAccess: PokemonsDataAccessService, store: Store) {
    const list$ = combineLatest([this.pageIndex$, this.pageSize$]).pipe(
      switchMap(([pageIndex, pageSize]) =>
        dataAccess.getList(pageIndex, pageSize)
      ),
      tap(({ items }) => store.dispatch(itemsLoaded({ items })))
    );

    // merge data from just loaded list and enriched items from state (since they load separately)
    this.list$ = combineLatest([list$, store.select(selectPokemons)]).pipe(
      map(([list, state]) => ({
        count: list.count,
        items: list.items.map((m) => state[m.name] || m),
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
}
