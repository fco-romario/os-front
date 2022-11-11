import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tecnico } from './../../../../model/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {
  id_tec='';
  tecnico: Tecnico = {
    id:'',
    nome:'',
    cpf:'',
    telefone:''
  }

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(private route: Router,
    private service: TecnicoService,
    private location: Location,
    private router: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id_tec = this.router.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void{
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
    });
  }

  onDelete():void{
    this.service.onDelete(this.id_tec).subscribe(resultado => {
      this.service.message('Técnico deletado com sucesso');
      this.onCancel();
    }, err => {
      if(err.error.error.match('possui Ordem de Serviço')){
        this.service.message('Técnico possui ordem de serviço. Não pode ser deletado');
      }
    });
  }
  onCancel(): void{
    this.location.back();
  }
}
