import { TestBed } from '@angular/core/testing';

import { BandServiceService } from './band-service.service';

describe('BandServiceService', () => {
  let service: BandServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
