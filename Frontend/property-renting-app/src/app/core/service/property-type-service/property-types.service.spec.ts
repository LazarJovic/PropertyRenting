import { TestBed } from '@angular/core/testing';

import { PropertyTypesService } from './property-types.service';

describe('PropertyTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyTypesService = TestBed.get(PropertyTypesService);
    expect(service).toBeTruthy();
  });
});
