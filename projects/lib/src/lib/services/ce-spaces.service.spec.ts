import { TestBed } from '@angular/core/testing';

import { CeSpacesService } from './ce-spaces.service';

describe('CeSpacesService', () => {
  let service: CeSpacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(CeSpacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
