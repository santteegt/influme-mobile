import { TestBed } from '@angular/core/testing';

import { UsersdealsextendService } from './usersdealsextend.service';

describe('UsersdealsextendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersdealsextendService = TestBed.get(UsersdealsextendService);
    expect(service).toBeTruthy();
  });
});
