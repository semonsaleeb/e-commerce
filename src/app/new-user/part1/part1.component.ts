import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-part1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, MessageModule, CardModule, PasswordModule],
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})
export class Part1Component {
  userForm1!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm1 = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
