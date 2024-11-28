import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatCardModule,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent implements AfterViewInit {
  private orderService = inject(OrdersService);
  private router = inject(Router)
  ordersList: Order[] = [];
  displayedColumns: string[] = [
    'OrderId',
    'UserName',
    'ProductsNo',
    'PaymentType',
    'OrderDate',
    'TotalAmount'
  ];
  dataSource = new MatTableDataSource<any>([]);
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.getOrders();
  }
  ngOnInit(): void {}
  getOrders() {
    this.orderService.getOrdersWithDetails().subscribe((res)=>{
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    })
  }
  onRowClicked(row:any){
    this.orderService.setOrderDetails(row)
    this.router.navigate([`/orders/details/${row?.OrderId}`]);
  }

}
