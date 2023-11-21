import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/user'
   }

   login(user: User): Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
   }
}
