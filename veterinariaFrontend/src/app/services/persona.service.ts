import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';
import { msg } from '../interfaces/pet';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http:HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/person'
   }

   getAllPerson():Observable<Persona[] | msg> {
    return this.http.get<Persona[] | msg>(`${this.myAppUrl}${this.myApiUrl}/`)
   }

   deletePerson(id:number) :Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}
