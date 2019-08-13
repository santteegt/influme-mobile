import { TestBed } from '@angular/core/testing';

import { InboxmessagesService } from './inboxmessages.service';

describe('InboxmessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InboxmessagesService = TestBed.get(InboxmessagesService);
    expect(service).toBeTruthy();
  });
});
