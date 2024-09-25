import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../model/product';
import { map, Observable } from 'rxjs';
import { Category } from '../../../model/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsUrl = environment.basicUrl+'products/'


  private http =inject(HttpClient) 
  
  
  getAllProducts() {
    return this.http.get<Product[]>(this.productsUrl)
  }

  getProductById(productId: number) {
    return this.http.get<Product>(`${this.productsUrl}${productId}`);
  }

  deleteProduct(product_id:number){
     console.log("services delete");
     return this.http.delete(this.productsUrl+ product_id)
    
  }

  editProduct(product_id: number, updatedProduct: any) {
    console.log("Service edit called");
    return this.http.put(this.productsUrl + product_id, updatedProduct);
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product);
  }


  getAllCategories() {
    return this.http.get<Category[]>(this.productsUrl+'/categories')
  }
}
