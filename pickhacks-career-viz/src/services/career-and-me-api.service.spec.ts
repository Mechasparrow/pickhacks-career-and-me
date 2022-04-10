import { TestBed } from '@angular/core/testing';

import { CareerAndMeApiService } from './career-and-me-api.service';

describe('CareerAndMeApiService', () => {
  let service: CareerAndMeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerAndMeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
