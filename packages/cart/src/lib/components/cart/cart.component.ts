import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeFromCart, selectCartPokemons } from '@tambo/store/cart';
import { Pokemon } from '@tambo/store/pokemons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'tambo-cart',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  readonly list$: Observable<Pokemon[]>;

  constructor(private readonly store: Store) {
    this.list$ = store.select(selectCartPokemons);
  }

  trackByRow(_: number, row: Pokemon) {
    return row.name;
  }

  onRemoveFromCart(pokemon: Pokemon) {
    return this.store.dispatch(removeFromCart({ name: pokemon.name }));
  }
}
