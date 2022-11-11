import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './../model/cliente';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

constructor(private http: HttpClient) { }

baseUrl: String = environment.baseUrl;

findAll():Observable<Cliente[]>{
  const url = this.baseUrl + "/clientes";
  return this.http.get<Cliente[]>(url);
}
}
