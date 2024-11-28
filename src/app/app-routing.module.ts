import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/products-list/products-list.component').then((m) => m.ProductsListComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/orders/orders-list/orders-list.component').then((m) => m.OrdersListComponent),
  },
  {
    path: 'orders/details/:id',
    loadComponent: () =>
      import('./components/orders/order-details/order-details.component').then(
        (m) => m.OrderDetailsComponent
      ),
  },
  // {
  //   path: 'order-details/:id',
  //   loadComponent: () =>
  //     import('./features/order-details/order-details.routes').then((m) => m.routes),
  // },
  {
    path: '**',
    redirectTo: '/products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
