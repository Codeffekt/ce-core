import { TestBed } from '@angular/core/testing';

import { CeProjectsService } from './ce-projects.service';

describe('CeProjectsService', () => {
  let service: CeProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(CeProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
