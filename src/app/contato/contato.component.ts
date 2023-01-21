import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  formContato = this.fb.group({
    nome: ["", [
      //denifindo a quantidade minima de caracteres do campo
      Validators.minLength(4),
      //definindo que o campo é obrigatorio
      Validators.required
    ]],
    assunto: ["", [
      Validators.minLength(10),
      Validators.required
    ]],
    telefone: ["", [
      Validators.minLength(11),
      Validators.required
    ]],
    email: ["", [
      Validators.email,
      Validators.required
    ]],
    mensagem: ["", [
      Validators.minLength(20),
      Validators.required
    ]],   
  });

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void{}

  //função para exibir a mensagem quando enviar e resetar o formulario
  enviarFormulario(){
    alert("Á mensagem foi enviada!");
    this.formContato.reset();
  }
}
