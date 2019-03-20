import { TestBed } from '@angular/core/testing';

import { MarkerprofileService } from './markerprofile.service';

describe('MarkerprofileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkerprofileService = TestBed.get(MarkerprofileService);
    expect(service).toBeTruthy();
  });
});
