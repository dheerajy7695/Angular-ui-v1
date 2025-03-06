import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  tokenloginData: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let loginData = sessionStorage.getItem('login-user');
    if (loginData != 'undefined') {
      this.tokenloginData = JSON.parse(loginData || '{}');
    } else {
      this.tokenloginData = '';
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login-user');
    this.router.navigate(['/login'])
  }

}
