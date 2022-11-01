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
  public invalidField = 'Campo inválido!';

  public pontoTuristicoForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    descricao: new FormControl('', [Validators.required]),
    aprovado: new FormControl('', [
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

  constructor(
    private router: Router,
    private pontoTuristicoService: PontosTuristicosService
  ) {}

  ngOnInit(): void {}

  confirmar() {
    if (!this.pontoTuristicoForm) {
      alert(this.invalidField);
      return;
    }

    this.pontoTuristicoService.adicionar(
      this.pontoTuristicoForm.getRawValue(),
      this.atracaoForm.getRawValue(),
      this.comentariosForm.getRawValue(),
      this.avaliacoesForm.getRawValue(),
      this.enderecoForm.getRawValue()
    );

    this.router.navigate(['pontoturistico']);
  }

  limparDados() {
    this.pontoTuristicoForm.clearValidators();
  }
}
