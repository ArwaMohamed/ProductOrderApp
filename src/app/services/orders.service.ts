import { inject, Injectable, signal } from '@angular/core';
import { AppService } from './app.service';
import { Order } from '../models/order.model';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  appService = inject(AppService);
  private productService = inject(ProductsService);
  private userService = inject(UsersService);
  basePath = 'orders';
  selectedOrder = signal<any>(null);
  constructor() { }


  getAllOrders(): Observable<Order[]> {
    return this.appService.get<Order[]>(this.basePath);
  }
  getOrdersWithDetails(): Observable<any[]> {
    return this.fetchOrdersData().pipe(
      map(({ orders, products, users }) =>
        orders.map(order => this.enrichOrderDetails(order, products, users))
      ),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return of([]);
      })
    );
  }

  getOrderById(orderId: number | string): Observable<any> {
    return this.fetchOrdersData().pipe(
      map(({ orders, products, users }) => {
        const order = orders.find(o => o.OrderId == orderId);
        if (!order) {
          throw new Error(`Order with ID ${orderId} not found`);
        }
        return this.enrichOrderDetails(order, products, users);
      }),
      catchError((error) => {
        console.error(`Error fetching order ${orderId}:`, error);
        return of(null);
      })
    );
  }

  setOrderDetails(order: any) {
    this.selectedOrder.set(order);
  }

  getOrderDetails() {
    return this.selectedOrder();
  }
  private fetchOrdersData(): Observable<{ orders: Order[]; products: Product[]; users: any[] }> {
    return forkJoin([
      this.appService.get<Order[]>(this.basePath),
      this.productService.getProducts(),
      this.userService.getAllUsers(),
    ]).pipe(
      map(([orders, products, users]) => ({ orders, products, users }))
    );
  }

  private enrichOrderDetails(order: Order, products: Product[], users: any[]): any {
    const totalAmount = this.calculateTotalAmount(order.Products, products);
    const user = users.find(u => u.Id === order.UserId);
    const productDetails = this.getProductDetails(order.Products, products);

    return {
      UserName: user?.Name || 'Unknown User',
      TotalAmount: totalAmount ? totalAmount.toFixed(2) : '0.00',
      CustomerDetails: user,
      ProductDetails: productDetails,
      OrderId: order.OrderId,
      UserId: order.UserId,
      ProductsNo: order.Products?.length || 0,
      PaymentType: order.PaymentType,
      OrderDate: this.validateDate(order.OrderDate) || '',
    };
  }
  private validateDate(dateString: string, defaultDate: Date = new Date()): Date {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? defaultDate : parsedDate;
  }
  private calculateTotalAmount(products: any[], availableProducts: any[]): number {
    return products.reduce((sum, orderProduct) => {
      const product = availableProducts.find((p) => p.ProductId === orderProduct.ProductId);
      return sum + (product?.ProductPrice || 0) * orderProduct.Quantity;
    }, 0);
  }

  private getProductDetails(orderProducts: any[], availableProducts: Product[]): any[] {
    return orderProducts.map((orderProduct) => {
      const product = availableProducts.find((p) => p.ProductId === orderProduct.ProductId);
      return {
       ...product
      };
    });
  }

}
