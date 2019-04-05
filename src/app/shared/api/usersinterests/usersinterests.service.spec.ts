import { TestBed } from '@angular/core/testing';

import { UsersinterestsService } from './usersinterests.service';

describe('UsersinterestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersinterestsService = TestBed.get(UsersinterestsService);
    expect(service).toBeTruthy();
  });
});
