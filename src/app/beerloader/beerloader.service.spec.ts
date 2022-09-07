import { TestBed } from '@angular/core/testing';

import { BeerloaderService } from './beerloader.service';

describe('BeerloaderService', () => {
  let service: BeerloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
