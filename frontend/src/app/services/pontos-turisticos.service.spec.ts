import { TestBed } from '@angular/core/testing';

import { PontosTuristicosService } from './pontos-turisticos.service';

describe('PontosTuristicosService', () => {
  let service: PontosTuristicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PontosTuristicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
