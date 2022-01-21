import { TestBed } from '@angular/core/testing';

import { ProfileMenuService } from './profile-menu.service';

describe('CategoryFiltersService', () => {
  let service: ProfileMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
