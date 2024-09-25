import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { User } from '../../../model/user';
import { catchError, EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-user-shell',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './user-shell.component.html',
  styleUrls: ['./user-shell.component.css'],
  providers: [UsersService]
})
export class UserShellComponent implements OnInit {

  users: User[] = []; // Initialize with an empty array
  error: string | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        this.error = 'Failed to load users. Please try again later.';
        return EMPTY; 
      })
    ).subscribe(data => {
      this.users = data;
      console.log(this.users);
      
    });
  }
}
