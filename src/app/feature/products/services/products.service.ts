import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../model/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  basicUrl = environment.basicUrl+'products/'


  private http =inject(HttpClient) 
  
  
  getAllProducts() {
    return this.http.get<Product[]>(this.basicUrl)
  }

  getProductById(productId: number) {
    return this.http.get<Product>(`${this.basicUrl}${productId}`);
  }

  deleteProduct(product_id:number){
     console.log("services delete");
     return this.http.delete(this.basicUrl+ product_id)
    
  }

  editProduct(product_id: number, updatedProduct: any) {
    console.log("Service edit called");
    return this.http.put(this.basicUrl + product_id, updatedProduct);
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.basicUrl, product);
  }

  // findProductCategories() {
  //   return this.http.get(this.basicUrl)
  //     .pipe(
  //       map(res => res["categories"])
  //     );
  // }

}
