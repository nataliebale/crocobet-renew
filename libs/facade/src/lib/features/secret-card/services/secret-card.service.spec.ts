import { TestBed } from '@angular/core/testing';

import { SecretCardService } from './secret-card.service';

describe('SecretCardService', () => {
  let service: SecretCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
