import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserService } from '../../services/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  signForm!: FormGroup
  loginResponse: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createSignForm();
  }

  createSignForm() {
    this.signForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.signForm.valid) {
      this.userService.login(this.signForm.value).subscribe({
        next: (response) => {
          this.loginResponse = response;
          if (response?.user?.token) {
            sessionStorage.setItem('token', response.user.token);
            sessionStorage.setItem('login-user', JSON.stringify(response.user));
          }
          this.router.navigate(['/user']);
        },
        error: (err) => {
          alert(err?.error?.message)
          console.log(err);
        }
      })
    }
  }

}
