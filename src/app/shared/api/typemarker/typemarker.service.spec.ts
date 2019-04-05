import { TestBed } from '@angular/core/testing';

import { TypemarkerService } from './typemarker.service';

describe('TypemarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypemarkerService = TestBed.get(TypemarkerService);
    expect(service).toBeTruthy();
  });
});
