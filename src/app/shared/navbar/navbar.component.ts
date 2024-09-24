import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ ButtonModule, ToolbarModule, MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    public router =inject(Router);
    items: MenuItem[] | undefined;

    constructor(public auth: LoginService){

    }

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
              route: '/products',
          },
          {
              label: 'Users',
              icon: 'pi pi-star',
              route: '/users',

          },
      ];
  }

  onLogout() {
    this.auth.logout();
    
console.log("log out done");

}

navigateTo(route: string) {
    this.router.navigate([route]);
  }
}