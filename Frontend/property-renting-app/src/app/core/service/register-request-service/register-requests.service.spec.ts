import { TestBed } from '@angular/core/testing';

import { RegisterRequestsService } from './register-requests.service';

describe('RegisterRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterRequestsService = TestBed.get(RegisterRequestsService);
    expect(service).toBeTruthy();
  });
});
