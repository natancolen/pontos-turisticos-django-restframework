import { PontosTuristicos as PontosTuristicosInterface } from './../interfaces/pontosturisticos.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import {PontosTuristicos} from '../interfaces/pontosturisticos.interface'

@Injectable({
  providedIn: 'root',
})
export class PontosTuristicosService {
  private apiRoot = 'http://localhost:8000/';
  private url = 'http://127.0.0.1:8000/';
  private urlPontoTuristico = 'pontoturistico/';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

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
   * @returns
   */
  getPontoTuristico(): Observable<PontosTuristicosInterface[]>{
    return this.http.get<PontosTuristicosInterface[]>(this.url + this.urlPontoTuristico);
  }

  /**
   *
   * @param pontoTuristico
   * @returns
   */
  getBuscarPontosTuristicos(pontoTuristico: string){
    return this.http.get(this.url + this.urlPontoTuristico + pontoTuristico);
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
   * @description postPontoTuristico, função que faz o post do pontoTuristico no db django.
   * @param pontoTuristico, parâmetro que faz referência ao próprio objeto do pontoTuristico que será buscado no db do django para será criado as informações do pontoTuristico, tais como nome, descricao e aprovado.
   * @returns
   */
  postPontoTuristico(pontoTuristico: any): Observable<any> {
    const body = {nome: pontoTuristico.nome, descricao: pontoTuristico.descricao, aprovado: pontoTuristico.aprovado}

    return this.http.post<PontosTuristicosInterface>(this.apiRoot.concat('pontoturistico/'),body);
  }

  /**
   * @description postPontoTuriscticoCompleto, função que salva todas as informações ponto turisito, incluindo atracoes, comentarios, avaliacoes e endeneço
   *
   * @param pontoTuristicoDados
   * @param atracaoDados
   * @param comentariosDados
   * @param avaliacoesDados
   * @param enderecoDados
   * @returns
   */
  postPontoTuriscticoCompleto(pontoTuristicoDados: any, atracaoDados: any, comentariosDados: any, avaliacoesDados: any, enderecoDados: any): Observable<any> {
    const atracoes = {nome: atracaoDados.nome, descricao: atracaoDados.descricao, horario_fun: atracaoDados.horario_fun, idade_min:atracaoDados.idade_min};
    const comentarios = {usuario: comentariosDados.usuario, comentarios: comentariosDados.comentarios, data: comentariosDados.data, aprovado: comentariosDados.aprovado};
    const avaliacoes = {user: avaliacoesDados.user, comentario: avaliacoesDados.comentario, nota: avaliacoesDados.nota, data: avaliacoesDados.data};
    const endereco = {linha1: enderecoDados.linha1, linha2:enderecoDados.linha2, cidade: enderecoDados.cidade, estado: enderecoDados.estado, pais:enderecoDados.pais, latitude: enderecoDados.latitude, longitude:enderecoDados.longitude,};

    const pontoTuristico = {nome: pontoTuristicoDados.nome, descricao: pontoTuristicoDados.descricao, aprovado: pontoTuristicoDados.aprovado, atracoes: atracoes, comentarios: comentarios, avaliacoes: avaliacoes, endereco: endereco};

    const body = {pontoTuristico: pontoTuristico, atracoes: atracoes, comentarios: comentarios, avaliacoes: avaliacoes, endereco: endereco};

    return this.http.post<PontosTuristicosInterface>(this.apiRoot.concat('pontoturistico/'), pontoTuristico);
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
    return this.http.delete(this.apiRoot.concat(`${this.urlPontoTuristico}${id}/`));
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
