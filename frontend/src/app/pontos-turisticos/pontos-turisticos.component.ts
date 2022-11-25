import { CadastroComponent } from './../cadastro/cadastro.component';
import { Router } from '@angular/router';
import { PontosTuristicosService } from './../services/pontos-turisticos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pontos-turisticos',
  templateUrl: './pontos-turisticos.component.html',
  styleUrls: ['./pontos-turisticos.component.css'],
})
export class PontosTuristicosComponent implements OnInit {
  public pontosTuristicos: any;
  public pontoTuristicoId?: number;

  constructor(private pontoTuristicoService: PontosTuristicosService, private router: Router) {}

  ngOnInit() {
    this.getPontoTuristico()

    this.pontoTuristicoService.pontoTuristicoId(-1);
  }

/**
 *
 * @description getPontoTuristico, função que chama o método getHttpPontoTuristico do PontoTuristicoService
 */
  getPontoTuristico(){
    this.pontoTuristicoService.getHttpPontoTuristico.subscribe(
      (pontoTuristico:any) => {
        console.log(pontoTuristico)
        this.pontosTuristicos = pontoTuristico;
      }
    ),
      (error: any) => {
        return console.log(error);
      };
  }

  /**
   *
   * @description updatePontoTuristico, função que chama o método pontoTuristicoId do PontoTuristicoService
   * @param id, parâmetro que recebe id do pontoTuristico do pontoturistico db django
   *
   */
  updatePontoTuristico(id: number){
    this.pontoTuristicoService.pontoTuristicoId(id);

    this.router.navigate(['cadastro'])
  }

  /**
   *
   * @description deletePontoTuristico, função que chama o método deletePontoTuristico do PontoTuristicoService
   * @param id, parâmetro que recebe id do pontoTuristico do pontoturistico db django
   * @param pontoTuristico, parâmetro que recebe o próprio objeto do pontoTuristico do pontoturistico db django
   */
  deletePontoTuristico(id: number, pontoTuristico: any){
    console.log('Delete')

    this.pontoTuristicoService.deletePontoTuristico(id, pontoTuristico);

    this.router.navigate(['home'])
  }

}

