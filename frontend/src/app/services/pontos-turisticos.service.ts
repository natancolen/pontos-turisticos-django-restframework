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
   * @description getIdPontoTuristico, função que retorno o id do pontoTuristico que deseja procurar ou deletar.
   */
  get getIdPontoTuristico() {
    return this.idPontoTuristico;
  }

  /**
  * @description getHttpPontoTuristico, função que faz um get e retorno os objetos do pontosTuristico do db django.
  */
  get getHttpPontoTuristico() {
    //return this.http.get(this.apiRoot.concat('pontoturistico'));
    return this.http.get(this.url + this.urlPontoTuristico);
  }

  /**
   * @description getTemIdPontoTuristico, função que retorno um booleano se tem id salvo ou nao do pontoTuristico a ser procurado.
   */
  get getTemIdPontoTuristico() {
    return this.temIdPontoTuristico;
  }

  /**
   *
   * @description getHttpPontoTuristicoId, função que faz o get do pontoTuristico retornando apenas um objeto no db django que tenha o id buscado.
   * @param id, parâmetro que faz referência ao próprio id do pontoTuristico que será buscado no db do django trazendo as informações do nome, descricao e aprovado.
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
   * @description postPontoTuristico, função que faz o post do pontoTuristico no db django.
   * @param pontoTuristico, parâmetro que faz referência ao próprio objeto do pontoTuristico que será buscado no db do django para será criado as informações do pontoTuristico, tais como nome, descricao e aprovado.
   * @returns
   */
  postPontoTuristico(pontoTuristico: any) {
    //this.pontosTuristicos.push(pontoTuristico);

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

  /**
   *
   * @description patchPontoTuristico, função que faz o patch do pontoTuristico no db django.
   * @param pontoTuristico , parâmetro que faz referência ao próprio objeto do pontoTuristico que será buscado no db do django para será editado as informações do pontoTuristico, tais como nome, descricao e aprovado.
   * @returns
   */
  patchPontoTuristico(pontoTuristico: any) {
    const nome = pontoTuristico.nome;
    const descricao = pontoTuristico.descricao;
    const aprovado = pontoTuristico.aprovado;

    return this.http.patch(this.apiRoot.concat(`${this.urlPontoTuristico}${this.idPontoTuristico}/`), {
      nome,
      descricao,
      aprovado,
    });
  }

  /**
   *
   * @description deletePontoTuristico, função que deleta o pontoTuristico no db django.
   * @param id, parâmetro que faz referência o id do pontoTuristico que será buscado no db do django para ser deletado.
   * @param pontoTuristico, parâmetro que faz referência ao próprio objeto do pontoTuristico que será buscado no db do django para ser deletado.
   * @returns
   */
  deletePontoTuristico(id: number, pontoTuristico: any) {
    return this.http.delete(this.apiRoot.concat(`${this.urlPontoTuristico}${id}/`)).subscribe(
      (pontoT: any) =>{
        pontoT = pontoTuristico;
        console.log(pontoT);
      }
    ),
    (error:any) =>{
      return console.log(error);
    };
  }

  /**
   * @description pontoTuristicoId, função que salva o id do pontoTuristico que está no db do django
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
