import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, msg } from '../interfaces/pet';

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

   getAllPets(): Observable<Pet[] | msg>{
    return this.http.get<Pet[] | msg>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   agregar(Mascota:Pet): Observable<Pet[]>{
    return this.http.post<Pet[]>(`${this.myAppUrl}${this.myApiUrl}/`, Mascota)
   }

   deletePet(id:string) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}
