import { TestBed } from '@angular/core/testing';

import { BandsService } from './bands.service';

describe('BandsService', () => {
  let service: BandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
