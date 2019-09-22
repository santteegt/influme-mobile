import { TestBed } from '@angular/core/testing';

import { DealsqrcodeService } from './dealsqrcode.service';

describe('DealsqrcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealsqrcodeService = TestBed.get(DealsqrcodeService);
    expect(service).toBeTruthy();
  });
});
