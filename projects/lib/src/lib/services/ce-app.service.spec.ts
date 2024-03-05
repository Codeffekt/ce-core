import { TestBed } from '@angular/core/testing';

import { CeAppService } from './ce-app.service';

describe('CeAppService', () => {
  let service: CeAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(CeAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
