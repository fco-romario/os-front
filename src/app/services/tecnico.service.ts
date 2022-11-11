import { Tecnico } from './../model/tecnico';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {


  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,
              private snack: MatSnackBar) { }

  findAll():Observable<Tecnico[]>{
    const url = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(url);
  }

  findById(id: any):Observable<Tecnico> {
    const url =`${this.baseUrl}/tecnicos/${id}`;
    return this.http.get<Tecnico>(url);

  }

  create(tecnico: Tecnico):Observable<Tecnico>{
    const url = this.baseUrl + "/tecnicos";
    return this.http.post<Tecnico>(url, tecnico);
  }

  update(tecnico: Tecnico):Observable<Tecnico>{
    const url = `${this.baseUrl}/tecnicos/${tecnico.id}`;
    return this.http.put<Tecnico>(url, tecnico);
  }

  onDelete(id: any):Observable<void>{
    const url = `${this.baseUrl}/tecnicos/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg: String): void{
    this.snack.open(`${msg}`, 'ok', {duration: 4000})
  }
}
