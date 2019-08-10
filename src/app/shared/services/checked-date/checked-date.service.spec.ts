import { TestBed } from '@angular/core/testing';

import { CheckedDateService } from './checked-date.service';

describe('CheckedDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckedDateService = TestBed.get(CheckedDateService);
    expect(service).toBeTruthy();
  });
});
