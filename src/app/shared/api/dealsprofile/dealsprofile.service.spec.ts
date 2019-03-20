import { TestBed } from '@angular/core/testing';

import { DealsprofileService } from './dealsprofile.service';

describe('DealsprofileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealsprofileService = TestBed.get(DealsprofileService);
    expect(service).toBeTruthy();
  });
});
