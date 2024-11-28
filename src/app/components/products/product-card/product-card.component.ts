import { Component, Input, OnChanges, Signal, signal, SimpleChanges } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from 'src/app/models/product.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LowStockDirective } from 'src/app/directive/low-stock.directive';
import { ProductsService } from 'src/app/services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule,MatIconModule,LowStockDirective,FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent{
  @Input() product:Product ={
    ProductId:0,
    ProductName:'',
    ProductImg:'',
    ProductPrice:0,
    AvailablePieces:0,
  }

  isEditing = false; // Tracks whether editing mode is active
  editedPieces!: number; // Temporary storage for the edited value

  constructor(private productsService: ProductsService) {}

  // Activate edit mode
  editAvailablePieces(): void {
    this.isEditing = true;
    this.editedPieces = this.product.AvailablePieces; // Load the current value into the input field
  }

  // Cancel editing
  cancelEdit(): void {
    this.isEditing = false;
  }

  // Save the new pieces value
  savePieces(): void {
    const newProduct = {...this.product , AvailablePieces:this.editedPieces}
    this.productsService.updateProduct(this.product.ProductId, newProduct).subscribe({
      next: (updatedProduct) => {
        console.log('Updated Product:', updatedProduct);
        this.product.AvailablePieces = updatedProduct.AvailablePieces;
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Failed to update product:', err);
      },
    });
  }
}
