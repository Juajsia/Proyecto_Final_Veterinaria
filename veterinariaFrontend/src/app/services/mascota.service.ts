import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/pet'
   }

   getAllPets(): Observable<Pet[]>{
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   getById(id: string): Observable<Pet[]>{
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   agregar(Mascota:Pet): Observable<Pet[]>{
    return this.http.post<Pet[]>(`${this.myAppUrl}${this.myApiUrl}/`, Mascota)
   }

   updateMascota(id: string, Mascota: Pet): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, Mascota)
   }
}
