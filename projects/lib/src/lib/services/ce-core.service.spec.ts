import { TestBed } from '@angular/core/testing';

import { CeCoreService } from './ce-core.service';

describe('CeCoreService', () => {
  let service: CeCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(CeCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
