import { Tecnico } from './../../../../model/tecnico';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
  id_tec = '';

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);


  constructor(private service: TecnicoService,
             private route: Location,
             private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec = this.router.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void{
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
    });
  }

  update(): void{
    this.service.update(this.tecnico).subscribe(resultaod =>{
      this.onCancel();
      this.service.message('Técnico atualizado com sucesso!');
    }, err =>{
      //console.log(err);
      if(err.error.error.match('já cadastrado')){
        this.service.message(err.error.error);
      } else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.service.message("Número de CPF inválido!");
        //console.log(err);
        //this.service.message(err.error.errors[0].message);
      }
    });
  }

  onCancel(){
    this.route.back();
  }

  onEdit(){

  }

  errorValidNome(){
    if(this.nome.invalid){
     return 'O nome deve ter entre 5 a 100 caracteres!';
    } else {
    return false;
    }
  }

  errorValidCPF(){
    if(this.cpf.invalid){
      return 'O CPF deve ter 11 caracteres!';
    } else {
    return false;
    }
  }

  errorValidTelefone(){
    if(this.telefone.invalid){
      return 'O telefone deve ter 11 caracteres!';
    } else {
    return false;
    }
  }

}
