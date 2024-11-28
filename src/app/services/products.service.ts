import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  appService = inject(AppService);
  basePath = 'products';
  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.appService.get<Product[]>(this.basePath);
  }
  addProduct(product: Product): Observable<Product> {
    return this.appService.post<Product>(this.basePath, product);
  }
  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.appService.put<Product>(
      `${this.basePath}/${productId}`,product
    );
  }
}
