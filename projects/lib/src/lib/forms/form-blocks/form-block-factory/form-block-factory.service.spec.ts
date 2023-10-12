import { TestBed } from '@angular/core/testing';

import { FormBlockFactoryService } from './form-block-factory.service';

describe('FormBlockFactoryService', () => {
  let service: FormBlockFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(FormBlockFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
