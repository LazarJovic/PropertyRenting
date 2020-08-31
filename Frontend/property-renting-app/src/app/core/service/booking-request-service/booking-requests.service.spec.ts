import { TestBed } from '@angular/core/testing';

import { BookingRequestsService } from './booking-requests.service';

describe('BookingRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingRequestsService = TestBed.get(BookingRequestsService);
    expect(service).toBeTruthy();
  });
});
