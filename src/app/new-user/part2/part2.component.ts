import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { Part1Component } from '../part1/part1.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-part2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, MessageModule, CardModule,ButtonModule ],
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.css']
})
export class Part2Component {
  userForm2!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(Part1Component) private part1: Part1Component
  ) {}

  ngOnInit(): void {
    this.userForm2 = this.formBuilder.group({
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
    if (this.part1.userForm1.valid && this.userForm2.valid) {
      console.log('User Data:', { ...this.part1.userForm1.value, ...this.userForm2.value });
      this.router.navigate(['users']);
    } else {
      console.log('Form is invalid');
    }
  }
}
