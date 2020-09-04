import { TestBed } from '@angular/core/testing';

import { AngularDndService } from './angular-dnd.service';

describe('AngularDndService', () => {
  let service: AngularDndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularDndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
