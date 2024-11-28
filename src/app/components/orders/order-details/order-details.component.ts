import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatCardModule,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  private orderService = inject(OrdersService);
  private activeRoute = inject(ActivatedRoute);

  order = computed(() => this.orderService.selectedOrder());
  constructor() {}

  ngOnInit() {
    if (!this.order()) {
      this.getOrderByID();
    }
  }
  getOrderByID() {
    const orderId = this.activeRoute.snapshot.paramMap.get('id') || 0;
    this.orderService.getOrderById(orderId).subscribe((res) => {
      this.orderService.setOrderDetails(res);
    });
  }
}
