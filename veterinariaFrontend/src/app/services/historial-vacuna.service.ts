import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialVacuna } from '../interfaces/historialVacuna';

@Injectable({
  providedIn: 'root'
})
export class HistorialVacunaService {
  private myAppUrl: string
  private myApiUrl: string
  constructor( private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/historialVacuna'
   }

   getAllHistorialVacuna(): Observable<HistorialVacuna[]>{
    return this.http.get<HistorialVacuna[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: string): Observable<HistorialVacuna[]>{
    return this.http.get<HistorialVacuna[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   agregar(HistorialVacuna:HistorialVacuna): Observable<HistorialVacuna[]>{
    return this.http.post<HistorialVacuna[]>(`${this.myAppUrl}${this.myApiUrl}/`, HistorialVacuna)
   }

   updateHistorialVacuna(id: string, HistorialVacuna: HistorialVacuna): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, HistorialVacuna)
   }
   deleteHistorialVacuna(id:string) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}
