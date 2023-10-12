import { TestBed } from '@angular/core/testing';

import { CeAccountService } from './ce-account.service';

describe('CeAccountService', () => {
  let service: CeAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(CeAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
