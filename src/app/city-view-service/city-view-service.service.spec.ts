import { TestBed } from '@angular/core/testing';

import { CityViewServiceService } from './city-view-service.service';

describe('CityViewServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityViewServiceService = TestBed.get(CityViewServiceService);
    expect(service).toBeTruthy();
  });
});
