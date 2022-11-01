import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PontosTuristicosRoutingModule } from './pontos-turisticos-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PontosTuristicosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PontosTuristicosModule {}
