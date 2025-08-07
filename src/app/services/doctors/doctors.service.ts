import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private jsonUrl = 'assets/data/doctors.json';

  private userURL = 'http://localhost:4000/api/doctors'


  constructor(private http: HttpClient) { }

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  getAllDoctors(): Observable<any> {
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
