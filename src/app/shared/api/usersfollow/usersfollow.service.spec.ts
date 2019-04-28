import { TestBed } from '@angular/core/testing';

import { UsersfollowService } from './usersfollow.service';

describe('UsersfollowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersfollowService = TestBed.get(UsersfollowService);
    expect(service).toBeTruthy();
  });
});
