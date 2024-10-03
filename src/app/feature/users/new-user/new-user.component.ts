import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule, CardModule, MessageModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup;
  public router = inject(Router);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
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
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
      this.router.navigate(['users']);
    } else {
      console.log('Form is invalid');
    }
  }
}
