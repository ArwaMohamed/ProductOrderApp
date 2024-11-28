import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { Product } from 'src/app/models/product.model';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,MatError,MatLabel,MatFormFieldModule,ReactiveFormsModule, CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{
  productForm: FormGroup;
  private fb = inject(FormBuilder)
  private dialogRef = inject( MatDialogRef<AddProductComponent>)
  @ViewChild('firstInput', { static: true }) firstInput!: ElementRef;
  constructor() {
    this.productForm = this.fb.group({
      ProductName: ['', [Validators.required, Validators.minLength(3)]],
      ProductImg: ['', Validators.required],
      AvailablePieces: [0, [Validators.required, Validators.min(0)]],
      ProductPrice: [0, [Validators.required, Validators.min(0.01)]]
    });
  }
  ngOnInit() {
    this.firstInput.nativeElement.focus();
  }
  save(): void {
    if (this.productForm.valid) {
      const newProduct: Product = {
        ProductId: Date.now(), // Example unique ID; replace with your logic
        ...this.productForm.value,
      };
      this.dialogRef.close(newProduct);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
