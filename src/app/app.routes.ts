import { provideRouter, Routes } from '@angular/router';
import { ProductShellComponent } from './feature/products/product-shell/product-shell.component';
import { ProductDetailsComponent } from './feature/products/product-details/product-details.component';
import { CreateNewProductComponent } from './core/create-new-product/create-new-product.component';
import { LoginComponent } from './shared/login/login.component';
import { UserShellComponent } from './feature/users/user-shell/user-shell.component';
import { AuthGuard } from './shared/login/service/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductShellComponent },
  {
    path: 'products/details/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
    providers: [AuthGuard],
  },
  {
    path: 'products/addNew',
    component: CreateNewProductComponent,
    canActivate: [AuthGuard],
    providers: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UserShellComponent,
    canActivate: [AuthGuard],
    providers: [AuthGuard],
  },
];
