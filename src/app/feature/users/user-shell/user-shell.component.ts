import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { User } from '../../../model/user';
import { catchError, EMPTY, of } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-user-shell',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, MenuModule],
  templateUrl: './user-shell.component.html',
  styleUrls: ['./user-shell.component.css'],
  providers: [UsersService],
})
export class UserShellComponent implements OnInit {
  users: User[] = [];
  error: string | null = null;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.usersService
      .getAllUsers()
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          this.error = 'Failed to load users. Please try again later.';
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
      });
  }

  OnDelete(userId: number): void {
    console.log('User ID to delete:', userId);
    this.usersService.deleteUser(userId).subscribe((res) => {
      console.log(res);
    });
  }
}
