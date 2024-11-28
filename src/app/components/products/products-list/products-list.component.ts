import { Component, inject, OnInit, Signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit{
  private productService = inject(ProductsService)
  productsList:Product[] =[]
  dialog = inject(MatDialog);
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts (){
    this.productService.getProducts().subscribe((res:Product[])=>{
      this.productsList = res
    })
  }
  addNewProduct(){
    const dialogRef = this.dialog.open(AddProductComponent, {
      width:"50%",
      panelClass:'add-product'
    });

    dialogRef.afterClosed().subscribe((newProduct: Product | undefined) => {
      if (newProduct) {
        this.productService.addProduct(newProduct).subscribe({
          next: (product) => {
            this.productsList = [...this.productsList,product]
            console.log('Product added successfully:', product);
            // Refresh product list or handle state update here
          },
          error: (err) => {
            console.error('Failed to add product:', err);
          },
        });
      }
    });
  }
}
