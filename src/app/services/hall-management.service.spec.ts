import { TestBed } from '@angular/core/testing';

import { HallManagementService } from './hall-management.service';

describe('HallManagementService', () => {
  let service: HallManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
