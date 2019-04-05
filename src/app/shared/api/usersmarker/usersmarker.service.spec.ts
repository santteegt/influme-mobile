import { TestBed } from '@angular/core/testing';

import { UsersmarkerService } from './usersmarker.service';

describe('UsersmarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersmarkerService = TestBed.get(UsersmarkerService);
    expect(service).toBeTruthy();
  });
});
