import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule for built-in directives
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule,FormsModule, PasswordModule]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: LoginService , private router: Router,) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['mor_2314', [Validators.required ]],
      password: ['83r5^_', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    const val = this.loginForm.value;

    this.auth.login(val.username, val.password)
        .subscribe(
            () => {
                this.router.navigateByUrl('/products');
            },
            err => {
                alert("Login failed!");
            }
        );

  }
}
