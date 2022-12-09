import { PontosTuristicos } from './../interfaces/pontosturisticos.interface';

import { PontosTuristicosService } from './../services/pontos-turisticos.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  public pontoTuristico!: PontosTuristicos;
  public invalidField = 'Campo inválido!';

  public pontoTuristicoForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    descricao: new FormControl('', [Validators.required]),
    aprovado: new FormControl(false, [
      Validators.required,
      Validators.requiredTrue,
    ]),
  });

  public atracaoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
    horario_fun: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
    idade_min: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
  });

  public comentariosForm = new FormGroup({
    comentario: new FormControl('', Validators.required),
    data: new FormControl('', [Validators.required]),
    aprovado: new FormControl('', [
      Validators.required,
      Validators.requiredTrue,
    ]),
  });

  public avaliacoesForm = new FormGroup({
    comentario: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
    nota: new FormControl('', [Validators.required]),
    data: new FormControl('', [Validators.required]),
  });

  public enderecoForm = new FormGroup({
    linha1: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
    linha2: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
    cidade: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
    estado: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
    pais: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private pontoTuristicoService: PontosTuristicosService) {}

  ngOnInit(){
    this.getPontoTuristicoId();
  }

  /**
   *
   * @description confirmar, função salva as informações do formulário e faz post ou patch.
   * @returns
   */
  confirmar() {
    if (!this.pontoTuristicoForm) {
      alert(this.invalidField);
      return;
    }

    if(this.pontoTuristicoService.getTemIdPontoTuristico){
      this.patchPontoTuristico();
    }
    else{
      //his.postPontoTuristico();
      this.postPontoTuristicoCompleto();
    }
    this.pontoTuristicoService.pontoTuristicoId(-1);
  }

  /**
   * @description limparDados, função que limpa as informações do cadastro
   */
  limparDados() {
    this.pontoTuristicoForm.clearValidators();
  }

/**
 * @description getPontoTuristicoId, função que chama o método getTemIdPontoTuristico do PontoTuristicoService
 */
 getPontoTuristicoId(){
  if(this.pontoTuristicoService.getTemIdPontoTuristico){
    let id:number = this.pontoTuristicoService.getIdPontoTuristico;

    this.pontoTuristicoService.getHttpPontoTuristicoId(id).subscribe(
      (pontoTuristico:any) => {
        this.pontoTuristicoForm.patchValue(pontoTuristico);
        console.log(pontoTuristico)
      }
    ),
      (error: any) => {
        return console.log(error);
      };
  }
}

/**
 *
 * @description patchPontoTuristico, é uma função que chama o método patchPontoTuristico do PontoTuristicoService.
 *
 */
patchPontoTuristico(){
  this.pontoTuristicoService.patchPontoTuristico(this.pontoTuristicoForm.getRawValue()).subscribe(
    (pontoTuristico:any) => {
    this.pontoTuristicoForm.patchValue(pontoTuristico);
    console.log(pontoTuristico);

    this.router.navigate(['pontoturistico']);
    }),
    (error:any) => {
      return console.log(error);
    };
}

/**
 *
 *@description postPontoTuristico, é uma função que chama o método postPontoTuristico do PontoTuristicoService.
 */
postPontoTuristico(){

  this.pontoTuristicoService.postPontoTuristico(this.pontoTuristicoForm.getRawValue()).subscribe(
    (pontoTuristico:any) => {
      console.log(pontoTuristico);

      this.router.navigate(['pontoturistico']);
    }
  ),
  (error:any) => {
     return console.log(error);
  };
}

postPontoTuristicoCompleto(){
  this.pontoTuristicoService.postPontoTuriscticoCompleto(this.pontoTuristicoForm.getRawValue(),this.atracaoForm.getRawValue(), this.comentariosForm.getRawValue(), this.avaliacoesForm.getRawValue(), this.enderecoForm.getRawValue()).subscribe((pontoTuristico: any) =>{
    console.log(pontoTuristico);
  }),
  (error:any)=>{
    return console.log(error);
  }
}

}
