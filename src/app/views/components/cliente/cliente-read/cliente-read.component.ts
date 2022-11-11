
import { Cliente } from './../../../../model/cliente';

import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/Cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {
  clientes: Cliente[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.list()
  }
  list(){
    return this.service.findAll().subscribe(resultado => {
      this.clientes = resultado;
    });
  }
}
