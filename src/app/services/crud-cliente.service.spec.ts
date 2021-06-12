import { TestBed } from '@angular/core/testing';

import { CrudClienteService } from './crud-cliente.service';

describe('CrudClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudClienteService = TestBed.get(CrudClienteService);
    expect(service).toBeTruthy();
  });
});
