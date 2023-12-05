import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = environment.appUrl
    this.myApiUrl = 'api/user'
   }

   login(user: User): Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
   }

   getAll(): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   getByCedula(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/ced/${id}`)
   }

   agregar(Cred: any): Observable<any[]>{
    return this.http.post<any[]>(`${this.myAppUrl}${this.myApiUrl}/`, Cred)
   }

   update(id: string, Cred: any): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, Cred)
   }

   delete(id:string) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   $modal = new EventEmitter<any>()
   $cedula = new EventEmitter<number>()

}
