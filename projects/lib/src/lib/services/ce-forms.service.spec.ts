import { TestBed } from '@angular/core/testing';

import { CeFormsService } from './ce-forms.service';

describe('CeFormsService', () => {
  let service: CeFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(CeFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
