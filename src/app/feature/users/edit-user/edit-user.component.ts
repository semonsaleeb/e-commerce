import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { UsersService } from '../services/users.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'], // Fixed typo: styleUrls (plural)
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  userId!: number;

  @Input() user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize the form
    this.editUserForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }, Validators.required], // Disabled ID field
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
      }),
      address: this.formBuilder.group({
        city: ['', Validators.required],
        street: ['', Validators.required],
      }),
    });

    // Load user details
    this.loadUserDetails(this.userId);
  }

  // Method to load user data and populate the form
  loadUserDetails(userId: number): void {
    this.usersService.getUserById(userId).subscribe((res) => {
      this.user = res;

      // Patch the form with the user data
      this.editUserForm.patchValue({
        id: res.id,
        username: res.username,
        email: res.email,
        password: res.password,
        name: {
          firstname: res.name.firstname,
          lastname: res.name.lastname,
        },
        address: {
          city: res.address.city,
          street: res.address.street,
        },
      });
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editUserForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  //getRawValue like . value but return all like id
    const updatedUserData = this.editUserForm.getRawValue();
    
    this.usersService.updateUser(this.userId, updatedUserData).subscribe(() => {
      console.log('User updated successfully', updatedUserData);
      this.router.navigate(['/users']);
    });
  }
  
}
