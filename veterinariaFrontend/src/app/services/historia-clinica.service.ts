import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoriaClinica } from '../interfaces/historiaClinica';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/HistoriaClinica'
   }

   getAllHistVac(): Observable<HistoriaClinica[]>{
    return this.http.get<HistoriaClinica[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: number): Observable<HistoriaClinica[]>{
    return this.http.get<HistoriaClinica[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   agregar(HistoriaClinica:HistoriaClinica): Observable<HistoriaClinica[]>{
    return this.http.post<HistoriaClinica[]>(`${this.myAppUrl}${this.myApiUrl}/`, HistoriaClinica)
   }

   updateHistoriaClinica(id: number, HistoriaClinica: HistoriaClinica): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, HistoriaClinica)
   }
   deleteHistoriaClinica(id:number) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}
