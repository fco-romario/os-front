import { Location } from '@angular/common';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Tecnico } from './../../../../model/tecnico';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TecnicoReadComponent } from '../tecnico-read/tecnico-read.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

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
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  onCrieate(){

  }

  onCancel(): void{
    this.location.back();
  }

  onCreate():void{
    this.service.create(this.tecnico).subscribe(resposta => {
      this.service.message('Técnico salvo com sucesso!');
      this.onCancel();
    }, err => {
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
