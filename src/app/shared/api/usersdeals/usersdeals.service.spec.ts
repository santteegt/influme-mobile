import { TestBed } from '@angular/core/testing';

import { UsersdealsService } from './usersdeals.service';

describe('UsersdealsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersdealsService = TestBed.get(UsersdealsService);
    expect(service).toBeTruthy();
  });
});
