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
  loading: boolean = false;

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
      this.loading = true;
      this.userService.login(this.signForm.value).subscribe({
        next: (response) => {
          this.loginResponse = response;
          this.loading = false;
          if (response?.user?.token) {
            sessionStorage.setItem('token', response.user.token);
            sessionStorage.setItem('login-user', JSON.stringify(response.user));
          }
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;
          alert(err?.error?.message)
        }
      })
    }
  }

}
