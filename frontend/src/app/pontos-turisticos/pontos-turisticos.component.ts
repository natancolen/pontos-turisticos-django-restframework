import { PontosTuristicosService } from './../services/pontos-turisticos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pontos-turisticos',
  templateUrl: './pontos-turisticos.component.html',
  styleUrls: ['./pontos-turisticos.component.css'],
})
export class PontosTuristicosComponent implements OnInit {
  pontosTuristicos: any;

  constructor(private pontoTuristicoService: PontosTuristicosService) {
    this.pontoTuristicoService.getHttpPontoTuristico.subscribe(
      (pontoTuristico) => {
        this.pontosTuristicos = pontoTuristico;
      }
    ),
      (error: any) => {
        return console.log(error);
      };
  }

  ngOnInit(): void {}
}
