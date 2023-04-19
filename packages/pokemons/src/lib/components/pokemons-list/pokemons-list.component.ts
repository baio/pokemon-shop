import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  tap,
} from 'rxjs';
import { PokemonsDataAccessService } from '../../services/pokemons.data-access.service';
import { PokemonsList } from '../../models/pokemons-list.model';
import { Store } from '@ngrx/store';
import { itemsLoaded } from '../../store/pokemons.actions';

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

  readonly list$: Observable<PokemonsList>;

  constructor(dataAccess: PokemonsDataAccessService, store: Store) {
    this.list$ = combineLatest([this.pageIndex$, this.pageSize$]).pipe(
      switchMap(([pageIndex, pageSize]) =>
        dataAccess.getList(pageIndex, pageSize)
      ),
      tap(({ items }) => store.dispatch(itemsLoaded({ items })))
    );
  }

  onPageIndexChanged(index: number) {
    this.pageIndex$.next(index);
  }

  onPageSizeChanged(size: number) {
    this.pageSize$.next(size);
  }
}
