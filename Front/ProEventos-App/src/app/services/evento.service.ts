import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseURL = `${environment.API}/evento`

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }

  getByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${tema}`);
  }

  getById(id: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${id}`);
  }

  create(evento: Evento): Observable<any> { 
    return this.http.post(this.baseURL, evento);
  }

  update(evento: Evento): Observable<any> {
    return this.http.put(`${this.baseURL}/${evento.id}`, evento);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  upload(file: any, fileName: string): Observable<any> {
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.baseURL}/upload/${fileName}`, formData);
  }

}
