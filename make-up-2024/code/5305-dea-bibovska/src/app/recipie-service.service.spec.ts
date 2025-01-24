import { TestBed } from '@angular/core/testing';

import { RecipieServiceService } from './recipie-service.service';

describe('RecipieServiceService', () => {
  let service: RecipieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
