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
 * @description Função para buscar pontos turisticos
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


  updatePontoTuristico(id: number){
    this.pontoTuristicoService.pontoTuristicoId(id);

    this.router.navigate(['cadastro'])
  }


}

