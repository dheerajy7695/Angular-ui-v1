import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private authURL = 'http://localhost:4000/api/auth'
  // private userURL = 'http://localhost:4000/api/users'

  private authURL = 'https://node-server-v1.onrender.com/api/auth';
  private userURL = 'https://node-server-v1.onrender.com/api/users';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.authURL}/login`, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.userURL}/get`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.userURL}/create`, data);
  }

  update(data: any, id: any): Observable<any> {
    return this.http.patch(`${this.userURL}/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.userURL}/delete/${id}`);
  }

}