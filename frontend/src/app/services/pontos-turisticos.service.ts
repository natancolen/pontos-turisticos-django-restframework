import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {PontosTuristicos} from '../interfaces/pontosturisticos.interface'

@Injectable({
  providedIn: 'root',
})
export class PontosTuristicosService {
  private url = 'http://127.0.0.1:8000/';
  private urlPontoTuristico = 'pontoturistico/';
  private apiRoot = 'http://localhost:8000/';

  private idPontoTuristico: number = -1;
  private pontosTuristicos: any[] = [];
  private temIdPontoTuristico?: boolean = false;

  constructor(private http: HttpClient) {}

  /**
   *
   */
  get getIdPontoTuristico() {
    return this.idPontoTuristico;
  }

  /**
   *
   */
  get getPontosTuristicos() {
    return this.pontosTuristicos;
  }

  /**
   *
   */
  get getHttpPontoTuristico() {
    //return this.http.get(this.apiRoot.concat('pontoturistico'));
    return this.http.get(this.url + this.urlPontoTuristico);
  }

  /**
   *
   */
  get getTemIdPontoTuristico() {
    return this.temIdPontoTuristico;
  }

  /**
   *
   * @param id
   * @returns
   */
  getHttpPontoTuristicoId(id: number) {
    return this.http.get(`${this.url}${this.urlPontoTuristico}${id}/`);
  }

  /**
   *
   * @param pontoTuristico
   * @param atracao
   * @param comentario
   * @param avaliacao
   * @param endereco
   * @returns
   */
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

  /**
   *
   * @param pontoTuristico
   * @returns
   */
  postPontoTuristico(pontoTuristico: any) {
    this.pontosTuristicos.push(pontoTuristico);

    const nome = pontoTuristico.nome;
    const descricao = pontoTuristico.descricao;
    const aprovado = pontoTuristico.aprovado;

    return this.http
      .post(this.apiRoot.concat('pontoturistico/'), {
        nome,
        descricao,
        aprovado,
      });
  }

  novoGetPontoTuristico(): Observable<PontosTuristicos>{
    return this.http.get<PontosTuristicos>(this.apiRoot.concat('pontoturistico'));
  }

  novoPostPontoTuristico(pontoTuristico: PontosTuristicos): Observable<PontosTuristicos>{
    return this.http.post<PontosTuristicos>(this.apiRoot.concat('pontoturistico'),{
      pontoTuristico
    });
  }

  patchPontoTuristico(pontoTuristico: any) {
    const nome = pontoTuristico.nome;
    const descricao = pontoTuristico.descricao;
    const aprovado = pontoTuristico.aprovado;

    return this.http.patch(this.apiRoot.concat(`${this.url}${this.urlPontoTuristico}${this.idPontoTuristico}/`), {
      nome,
      descricao,
      aprovado,
    });
  }

  /**
   * @descrition
   *
   * @param id
   */
  pontoTuristicoId(id: number) {
    if (id < 0) {
      this.temIdPontoTuristico = false;
    } else {
      this.temIdPontoTuristico = true;
    }

    this.idPontoTuristico = id;
  }
}
