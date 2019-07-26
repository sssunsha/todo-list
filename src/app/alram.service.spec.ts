import { TestBed } from '@angular/core/testing';

import { AlramService } from './alram.service';

describe('AlramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlramService = TestBed.get(AlramService);
    expect(service).toBeTruthy();
  });
});
