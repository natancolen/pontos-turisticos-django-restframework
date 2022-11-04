import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PontosTuristicosService {
  private url = 'http://127.0.0.1:8000/';
  private urlPontoTuristico = 'pontoturistico/';
  private apiRoot = 'http://localhost:8000/';

  private pontosTuristicos: any[];

  constructor(private http: HttpClient) {
    this.pontosTuristicos = [];
  }

  get getPontosTuristicos() {
    return this.pontosTuristicos;
  }

  get getHttpPontoTuristico() {
    //return this.http.get(this.apiRoot.concat('pontoturistico'));
    return this.http.get(this.url + this.urlPontoTuristico);
  }

  adicionar(
    pontoTuristico: any,
    atracao: any,
    comentario: any,
    avaliacao: any,
    endereco: any
  ) {
    const dadosPontoTuristicos = [
      pontoTuristico,
      atracao,
      comentario,
      avaliacao,
      endereco,
    ];

    this.pontosTuristicos.push(dadosPontoTuristicos);

    const nome = pontoTuristico.nome;
    const descricao = pontoTuristico.descricao;
    const aprovado = pontoTuristico.aprovado;
    const atracoes = atracao;
    const comentarios = comentario;
    const avaliacoes = avaliacao;
    const enderecos = endereco;

    // return this.http.post(
    //   this.url + this.urlPontoTuristico,
    //   dadosPontoTuristicos
    // );

    return this.http.post(this.apiRoot.concat('pontoturistico/'), {
      nome,
      descricao,
      aprovado,
      atracoes,
      comentarios,
      avaliacoes,
      enderecos,
    });
  }

  adicionarPontoTuristico(pontoTuristico: any) {
    this.pontosTuristicos.push(pontoTuristico);

    const nome = pontoTuristico.nome;
    const descricao = pontoTuristico.descricao;
    const aprovado = pontoTuristico.aprovado;

    return this.http.post(this.apiRoot.concat('pontoturistico/'), {
      nome,
      descricao,
      aprovado,
    });
  }
}
