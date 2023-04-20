import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartSummary, selectCartSummary } from '@tambo/store/cart';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Observable } from 'rxjs';

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
    this.cartSummary$ = store.select(selectCartSummary);
  }
}
