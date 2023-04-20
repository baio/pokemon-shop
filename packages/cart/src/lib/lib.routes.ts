import { Route } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

export const cartRoutes: Route[] = [
  {
    path: '',
    component: CartComponent,
  },
];
