import { ProductListingComponent } from './../product-listing/product-listing.component';
import { environment } from './../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { CardComponent } from '../../../shared/product/card.component';
import { ProductsService } from '../services/products.service';
import { Product } from '../../../model/product';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-product-shell',
  standalone: true,
  imports: [CardComponent, ProductListingComponent, NavbarComponent],
  templateUrl: './product-shell.component.html',
  styleUrl: './product-shell.component.css',
})
export class ProductShellComponent {
  private productService = inject(ProductsService);

  products: Product[] = [];
  ProductListingComponent: any;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  OnDeleteProduct(product_id: number) {
    console.log('shell: ' + product_id);
    this.productService.deleteProduct(product_id).subscribe((res) => {
      console.log(res);
    });
  }
}
