import { TestBed } from '@angular/core/testing';

import { CrudVeiculoService } from './crud-veiculo.service';

describe('CrudVeiculoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudVeiculoService = TestBed.get(CrudVeiculoService);
    expect(service).toBeTruthy();
  });
});
